import { NavLink } from 'react-router-dom'

function Navbar () {
  return (
    <nav style={style.nav}>
      <ul style={style.ul}>
        <li style={style.li}>
          <NavLink style={style.a} to='/'>
            Home
          </NavLink>
        </li>
        <li style={style.li}>
          <NavLink style={style.a} to='/PokeApi'>
            PokeDex
          </NavLink>
        </li>
        <li style={style.li}>
          <NavLink style={style.a} to='/generations'>
            Generaciones
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

const style = {
  nav: {
    backgroundColor: '#333',
    padding: '10px 0',
    borderRadius: '20px 20px 0px 0px'
  },
  ul: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyle: 'none',
    padding: '0',
    margin: '0'
  },
  li: {
    padding: '10px 20px',
    margin: '0 5px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#555'
    }
  },
  a: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '14px',
    padding: '5px 10px',
    borderRadius: '5px'
  },
  active: {
    backgroundColor: '#555'
  }
}

export default Navbar