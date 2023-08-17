import { useState, useEffect } from 'react'
import './PrimeraGeneracion.css'

function PrimeraGeneracion () {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    getPokemonsPG()
  }, [])

  const getPokemonsPG = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    const data = await response.json()

    const pokemonsData = await Promise.all(
      data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url)
        return response.json()
      })
    )

    setPokemons(pokemonsData)
  }

  return (
    <div className="generacion-container">
      <h2 className="titulo-h2PG">Primera Generación</h2>
      <ul className="pokemon-list">
        {pokemons.map((pokemon) => (
          <li key={pokemon.id} className={`pokemon ${pokemon.types[0].type.name}`}>
            <div className="pokemon-number">#{pokemon.id.toString().padStart(3, '0')}</div>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
            <div className="pokemon-name">{pokemon.name}</div>
            <div className="pokemon-types">
              {pokemon.types.map((typeInfo) => (
                <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PrimeraGeneracion
