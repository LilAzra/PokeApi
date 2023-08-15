import { useState, useEffect } from "react";
import './App.css';
import uuid from 'react-uuid'
import pokeball from './assets/pokeball.svg'
import SearchPokemon from "./components/SearchPokemon";

function PokeApi() {


  const [pokemons, setPokemons] = useState([])
  const [pagina, setPagina] = useState(1)

  const nextPage = (currentPagina) => {
    const offset = currentPagina*10
    setPagina(currentPagina+1)
    setPokemons([])
    getPokemons({offset})
  }

  const prevPage = (currentPagina) => {
    const offset = currentPagina*10 > 0 ? currentPagina*10 : 0
    setPagina(currentPagina-1)
    setPokemons([])
    getPokemons({offset})
  }


  useEffect(() => {
    if (!(pokemons.length > 0)){
      getPokemons(0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const getPokemons = ({offset}) => {

    const url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset ? offset : 0}`
    console.log(url)
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
    <div className="pokedex-container">
      <center><img className="pokemon-svg" src={pokeball} /></center>
      <h1>Pokedex</h1>
      <SearchPokemon />
      <div style={styles.flex}>
        {
          pokemons.length > 0
            ? pokemons.map(pokemonData => (
              <div key={uuid()} style={styles.card}>
                <img style={styles.image} src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                <div style={styles.name}>{pokemonData.name}</div>
                <div style={styles.types}>
                  {pokemonData.types.map(typeInfo => (
                    <span key={typeInfo.type.name}>{typeInfo.type.name} </span>
                  ))}
                </div>
              </div>
            ))
            : <h2>Cargando...</h2>
        }
      </div>
      <button disabled={Boolean(pagina <= 1)} onClick={() => prevPage(pagina)}>{"<"}</button>
      <button onClick={() => nextPage(pagina)}>{">"}</button>
    </div>
  );
}

const styles = {
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
    // flexDirection: 'colum'
  },

  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100px',
    padding: '20px',
    margin: '16px',
    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
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

export default PokeApi;
