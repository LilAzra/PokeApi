import React, { useState, useEffect } from 'react'
import './PokeApi.css'
import uuid from 'react-uuid'
import pokeball from '../assets/pokeball.svg'
import SearchPokemon from './SearchPokemon.jsx'
import { Container, Row, Col, Button } from 'react-bootstrap'

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
        const promises = results.map(result => fetch(result.url).then(res => res.json()))
        Promise.all(promises)
          .then(data => setPokemons(data))
          .catch(e => console.log(e))
      })
  }

  return (
    <Container className='pokedex-container'>
      <center>
        <img className='pokemon-svg' src={pokeball} alt='Pokeball' />
      </center>
      <h1 className='text-center tituloh1'>Pokedex</h1>
      <SearchPokemon />
      <div className='mt-4'>
        <Row className='justify-content-center'>
          {pokemons.length > 0 ? (
            pokemons.map((pokemonData) => (
              <Col key={uuid()} xs={12} sm={6} md={4} lg={3}>
                <div style={styles.card} className='mb-3'>
                  <img style={styles.image} src={pokemonData.sprites.front_default} alt={pokemonData.name} />
                  <div style={styles.name}>{pokemonData.name}</div>
                  <div className='pokemon-type' style={styles.types}>
                    {pokemonData.types.map((typeInfo) => (
                      <span key={typeInfo.type.name}>{typeInfo.type.name} </span>
                    ))}
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <h2 className='pokeapi-loading text-center'>Cargando...</h2>
          )}
        </Row>
      </div>
      <div className='text-center d-flex gap-3 justify-content-center'>
        <Button variant='dark' disabled={pagina <= 1} onClick={prevPage}>
          {'< Anterior'}
        </Button>
        <Button variant='dark' onClick={() => nextPage(pagina)}>
          {'Siguiente >'}
        </Button>
      </div>
    </Container>
  )
}

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '100%',
    padding: '20px',

    margin: 'auto',
    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)'
  },
  image: {
    width: '100%',
    height: 'auto',
    marginTop: '1px'
  },
  name: {
    textAlign: 'center',
    fontSize: '15px',
    fontWeight: 'bold',
    marginTop: '8px'
  },
  types: {
    textAlign: 'center',
    marginTop: '8px'
  }
}

export default PokeApi
