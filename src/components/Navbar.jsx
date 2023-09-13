import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NavbarMenu () {
  const generation = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>Poke-API</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/pokeApi'>PokeDex</Nav.Link>
            <NavDropdown title='Generaciones'>
              {generation.map(gen => (
                <NavDropdown.Item
                  key={gen}
                  as={Link}
                  to={`/generation/${gen}`}
                >
                  Generación {gen}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarMenu
