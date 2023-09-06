import { useState, useEffect } from 'react'
import './PokeApi.css'
import uuid from 'react-uuid'
import pokeball from '../assets/pokeball.svg'
import SearchPokemon from './SearchPokemon.jsx'

function PokeApi () {
  const [pokemons, setPokemons] = useState([])
  const [pagina, setPagina] = useState(1)

  const nextPage = (currentPagina) => {
    const offset = currentPagina * 10
    setPagina(currentPagina + 1)
    setPokemons([])
    getPokemons({ offset })
  }

  const prevPage = () => {
    if (pagina > 1) {
      const newPagina = pagina - 1
      setPagina(newPagina)
      setPokemons([])
      getPokemons({ offset: (newPagina - 1) * 10 })
    }
  }

  useEffect(() => {
    if (!(pokemons.length > 0)) {
      getPokemons(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getPokemons = ({ offset }) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset ? offset : 0}`
    fetch(url)
      .then(res => res.json())
      .then(({ results }) => {
        results.forEach(element => {
          fetch(element.url)
            .then(res => res.json())
            .then(data => setPokemons(prevState => [...prevState, data]))
            .catch(e => console.log(e))
        })
      })
  }

  return (
    <div className='pokedex-container'>
      <center><img className='pokemon-svg' src={pokeball} /></center>
      <h1 className='tituloh1'>Pokedex</h1>
      <SearchPokemon />
      <div style={styles.flex}>
        {
          pokemons.length > 0
            ? pokemons.map(pokemonData => (
              <div key={uuid()} style={styles.card}>
                <img style={styles.image} src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                <div style={styles.name}>{pokemonData.name}</div>
                <div className='pokemon-type' style={styles.types}>
                  {pokemonData.types.map(typeInfo => (
                    <span key={typeInfo.type.name}>{typeInfo.type.name} </span>
                  ))}
                </div>
              </div>
            ))
            : <h2 className='pokeapi-loading'>Cargando...</h2>
        }
      </div>
      <button className='boton-paginacion' disabled={pagina <= 1} onClick={prevPage}>{'<Antorior'}</button>
      <button className='boton-paginacion' onClick={() => nextPage(pagina)}>{'Siguiente>'}</button>
    </div>
  )
}

const styles = {
  flex: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },

  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100px',
    padding: '20px',
    margin: '16px',
    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)'
  },
  image: {
    width: '100%',
    height: 'auto'
  },
  name: {
    textAlign: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    marginTop: '8px'
  },
  types: {
    textAlign: 'center',
    marginTop: '8px'
  }
}

export default PokeApi
