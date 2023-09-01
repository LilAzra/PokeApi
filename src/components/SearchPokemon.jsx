import { useState } from 'react'
import './PokeApi.css'

function SearchPokemon () {
  const POKE_API = 'https://pokeapi.co/api/v2/pokemon/'

  const [campo, setCampo] = useState('')
  const [pokemon, setPokemon] = useState(null)
  const [errors, setErrors] = useState(null)
  const buscarPokemon = (e) => {
    e.preventDefault()
    setErrors(null)
    setPokemon(null)
    fetch(POKE_API + campo.split()[0].toLocaleLowerCase())
      .then((res) => {
        if (!res.ok) return setErrors('Escribe bien, ¡disléxico!😃')
        return res.json()
      })
      .then((poke) => setPokemon(poke))
      .catch(e => console.log(e))
  }
  return (
    <div>
      <form onSubmit={buscarPokemon}>
        <input className='input-busqueda' value={campo} onChange={e => setCampo(e.target.value)} type='text' placeholder='Nombre del Pokémon' />
        <button className='boton-buscar'>Buscar</button>
      </form>
      {errors && <h3 className='error'>{errors}</h3>}
      {!errors && pokemon !== null
        ? (
          <div className='pokemon-info'>
            <p className='"pokemon-name'>{pokemon.name}</p>
            <p className='pokemon-order'>N° {pokemon.id}</p>
            {
                campo.toLocaleLowerCase().endsWith('gay')
                  ? (
                    <img src={pokemon.sprites.front_shiny} alt='Version LG-TV' />
                    )
                  : (
                    <img src={pokemon.sprites.front_default} alt={`${pokemon.name} Sprite`} />
                    )
            }
            <div className='pokemon-skill'>
              {
                pokemon.types.map(type => (
                  <span key={type.type.name}>{type.type.name}</span>
                ))
              }
            </div>
          </div>
          )
        : null}
    </div>
  )
}

export default SearchPokemon
