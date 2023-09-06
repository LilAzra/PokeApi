import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './GeneracionAll.css'
import GeneracionAllList from './GeneracionAllList'

function GeneracionAll () {
  const [pokemons, setPokemons] = useState([])
  const location = useLocation()
  const pathname = location.pathname

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
    } else {
      console.log('No hay nada que mostrar')
    }
  }

  useEffect(() => {
    getPokemons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <div className='generacion-container'>
      <h2>Lista de Generaciones</h2>
      <GeneracionAllList />
      <ul className='pokemon-list'>
        {
        pokemons.length !== 0
          ? (
              pokemons.map((pokemon) => (
                <li key={pokemon.id} className={`pokemon ${pokemon.types[0].type.name}`}>
                  <div className='pokemon-number'>#{pokemon.id.toString().padStart(3, '0')}</div>
                  <img src={pokemon.sprites.front_default} alt={pokemon.name} className='pokemon-image' />
                  <div className='pokemon-name'>{pokemon.name}</div>
                  <div className='pokemon-types'>
                    {pokemon.types.map((typeInfo) => (
                      <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
                        {typeInfo.type.name}
                      </span>
                    ))}
                  </div>
                </li>
              )
              ))
          : <h2 className='alllist-Loading'>Cargando...</h2>
          }
      </ul>
    </div>
  )
}
export default GeneracionAll
