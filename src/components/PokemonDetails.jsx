import React from 'react'
import { Button, Col, Modal } from 'react-bootstrap'

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

function PokemonDetails ({ pokemon, setIsCardOpen }) {
  return (
    <Modal
      show={true}
      onHide={() => setIsCardOpen(false)}
      style={customModalStyle}
    >
      <Modal.Body>
        <h2 className='pb-4'>{pokemon.name}</h2>
        <div className='d-flex justify-content-center align-items-center'>
          <Col>
            <img
              style={{
                width: 100,
                height: 100
              }}
              src={pokemon.sprites.other?.dream_world.front_default || pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </Col>
          <Col>
            <div>
              <p><strong>Altura:</strong> {pokemon.height}</p>
              <p><strong>Peso:</strong> {pokemon.weight}</p>
            </div>
          </Col>
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
