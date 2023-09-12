import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const customModalStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '20px',
  textAlign: 'center'
}

const imageStyle = {
  maxWidth: '80%',
  height: 'auto',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  margin: '0 auto'
}

const nameStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  margin: '10px 0'
}

const infoStyle = {
  textAlign: 'left',
  marginTop: '20px'
}

function PokemonDetails({ pokemon, setIsCardOpen }) {
  return (
    <Modal
      show={true}
      onHide={() => setIsCardOpen(false)}
      style={customModalStyle}
    >
      <Modal.Header closeButton>
        <Modal.Title style={nameStyle}>{pokemon.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          style={imageStyle}
        />

        <div style={infoStyle}>
          <p><strong>Altura:</strong> {pokemon.height}</p>
          <p><strong>Peso:</strong> {pokemon.weight}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setIsCardOpen(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default PokemonDetails
