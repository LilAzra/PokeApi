import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
// import { Container, Row, Col } from 'react-bootstrap'
import './GeneracionAll.css'
import PokemonDetails from './PokemonDetails'
import CatalogMagic from './PantallaCarga'

function GeneracionAll () {
  const [pokemons, setPokemons] = useState([])
  const location = useLocation()
  const pathname = location.pathname
  const [isCardOpen, setIsCardOpen] = useState(false)
  const [pokemonDetails, setPokemonDetails] = useState({})
  const [loading, setLoading] = useState(true)

  const getPokemons = async () => {
    setPokemons([])
    const generationUrl = 'https://pokeapi.co/api/v2' + pathname
    const response = await fetch(generationUrl)
    const results = await response.json()
    const pokemonSpecies = results.pokemon_species

    if (pokemonSpecies) {
      const promises = pokemonSpecies.map(async (pokemon) => {
        const url = pokemon.url.replace('pokemon-species', 'pokemon')
        const res = await fetch(url)
        return res.json()
      })

      const pokemonsData = await Promise.all(promises)
      setPokemons(pokemonsData.sort((a, b) => a.id - b.id))
      setLoading(false)
    } else {
      console.log('No hay nada que mostrar')
      setLoading(false)
    }
  }

  const infoPokeonCard = (pokemon) => {
    setIsCardOpen(true)
    setPokemonDetails(pokemon)
  }

  useEffect(() => {
    getPokemons()
  }, [pathname])
  return (
    <div className='generacion-container'>
      <h2 className='alert alert-success'>Generacion: {pathname.split('/')[2]}</h2>
      {isCardOpen && (
        <PokemonDetails pokemon={pokemonDetails} setIsCardOpen={setIsCardOpen} />
      )}
      {
      loading
        ?
          (
              <div className='alllist-Loading'>
                <div className='text-center'>
                  <CatalogMagic />
                </div>
              </div>
          ) : (
            <div className='pokemon-list'>
              {pokemons.map((pokemon) => (
                <div key={pokemon.id} className={`pokemon border rounded p-2 text-center ${pokemon.types[0].type.name} mb-3 mx-2`} onClick={() => infoPokeonCard(pokemon)}>
                  <div className='pokemon-number'>#{pokemon.id.toString().padStart(3, '0')}</div>
                  <img
                    src={pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_default}
                    alt={pokemon.name}
                    className='pokemon-image'
                    style={{ maxWidth: '100%', marginBottom: '10px' }}
                  />
                  <div className='pokemon-name'>{pokemon.name}</div>
                  <div className='pokemon-types'>
                    {pokemon.types.map((typeInfo) => (
                      <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
                        {typeInfo.type.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        }
    </div>
  )
}
export default GeneracionAll
