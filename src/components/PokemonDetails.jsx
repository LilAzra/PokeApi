import React, { useState, useEffect } from 'react'
import { Button, Col, Modal } from 'react-bootstrap'

const customModalStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  textAlign: 'center',
  borderRadius: '10%'
}

const moveListStyle = {
  maxHeight: '200px',
  overflowY: 'auto'
}

function PokemonDetails ({ pokemon, setIsCardOpen }) {
  const [moves, setMoves] = useState([])
  const [showMoves, setShowMoves] = useState(false)
  const [evolutions, setEvolutions] = useState([])
  const [showEvolutions, setShowEvolutions] = useState(false)

  const movesUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`

  const fetchMoves = async () => {
    try {
      const response = await fetch(movesUrl)
      const data = await response.json()
      setMoves(data.moves.map((move) => move.move.name))
    } catch (error) {
      console.error('Error fetching moves:', error)
    }
  }

  const fetchEvolutions = async () => {
    try {
      const response = await fetch(speciesUrl)
      const data = await response.json()
      const evolutionChainUrl = data.evolution_chain.url
      const chainResponse = await fetch(evolutionChainUrl)
      const chainData = await chainResponse.json()

      const evolutions = getEvolutionsFromChain(chainData.chain)
      setEvolutions(evolutions)
    } catch (error) {
      console.error('Error fetching evolutions:', error)
    }
  }

  const getEvolutionsFromChain = (chain) => {
    const evolutions = []
    while (chain) {
      const speciesName = chain.species.name
      evolutions.push(speciesName)
      chain = chain.evolves_to[0]
    }
    return evolutions
  }

  useEffect(() => {
    fetchMoves()
    fetchEvolutions()
  }, [movesUrl, speciesUrl])

  function getColorForType (type) {
    const typeColors = {
      normal: '#a8a878',
      fire: '#f08030',
      water: '#6890f0',
      electric: '#f8d030',
      grass: '#78c850',
      ice: '#98d8d8',
      fighting: '#c03028',
      poison: '#a040a0',
      ground: '#e0c068',
      flying: '#a890f0',
      psychic: '#f85888',
      bug: '#a8b820',
      rock: '#b8a038',
      ghost: '#705898',
      dragon: '#7038f8',
      dark: '#705848',
      steel: '#b8b8d0',
      fairy: '#ee99ac'
    }
    return typeColors[type]
  }

  const backgroundColorStyle = {
    backgroundColor: getColorForType(pokemon.types[0].type.name)
  }

  return (
    <Modal show={true} onHide={() => setIsCardOpen(false)} style={customModalStyle}>
      <Modal.Body style={backgroundColorStyle}>
        <h2 className='pb-4'>{pokemon.name}</h2>
        <div className='d-flex justify-content-center align-items-center'>
          <Col>
            <img
              style={{
                width: 100,
                height: 100
              }}
              src={
                pokemon.sprites.other?.dream_world.front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
            />
          </Col>
          <Col>
            <div>
              <p>
                <strong>Altura:</strong> {pokemon.height}
              </p>
              <p>
                <strong>Peso:</strong> {pokemon.weight}
              </p>
            </div>
          </Col>
          <Button variant='secondary' onClick={() => setIsCardOpen(false)}>
            Cerrar
          </Button>
        </div>
        <div className='mt-4'>
          <Button variant='primary' onClick={() => setShowMoves(!showMoves)}>
            {showMoves ? 'Ocultar Movimientos' : 'Mostrar Movimientos'}
          </Button>
          {showMoves && (
            <div style={moveListStyle}>
              <h3>Movimientos:</h3>
              <ul>
                {moves.map((move, index) => (
                  <li key={index}>{move}</li>
                ))}
              </ul>
            </div>
          )}

          <div className='mt-4'>
            <Button variant='primary' onClick={() => setShowEvolutions(!showEvolutions)}>
              {showEvolutions ? 'Ocultar Evoluciones' : 'Mostrar Evoluciones'}
            </Button>
            {showEvolutions && (
              <div>
                <h3>Evoluciones:</h3>
                <ul>
                  {evolutions.map((evolution, index) => (
                    <li key={index}>{evolution}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default PokemonDetails
