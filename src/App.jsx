import { useState } from "react"

function PokeApi() {

  const POKE_API = 'https://pokeapi.co/api/v2/pokemon/'

  const [campo, setCampo] = useState('')
  const [pokemon, setPokemon] = useState(null)

  const buscarPokemon = (e) => {
    e.preventDefault()
    fetch(POKE_API + campo.toLocaleLowerCase())
      .then((res) => res.json())
      .then((poke) => setPokemon(poke))
  }

  return (
    <div>
      <h1>Busca Tu Pokemon</h1>
      <form onSubmit={buscarPokemon}>
        <input value={campo} onChange={e => setCampo(e.target.value)} type="text" />
        <button> Buscar </button>
      </form>
      {
        pokemon !== null ?
          <>
            <p>{pokemon.name}</p>
            <p>{pokemon.order}</p>
            <img src={pokemon.sprites.front_default} />
          </>
          : null
      }
    <button onClick={() => setPokemon(null)}>Clear</button>
    </div>
  )
}

export default PokeApi