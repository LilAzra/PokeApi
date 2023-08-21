import { NavLink } from 'react-router-dom'

const proyectos = [
  {
    path: '/',
    label: 'Home'
  },
  {
    path: '/PokeApi',
    label: 'PokeDex'
  },
  {
    path: '/PrimeraGeneracion',
    label: 'Primera Generacion'
  },
  {
    path: '/SegundaGeneracion',
    label: 'Segunda Generacion'
  }
]

function Navbar () {
  return (
    <nav style={style.nav}>
      <ul style={style.ul}>
        {proyectos.map(item => (
          <li style={style.li} key={item.path}>
            <NavLink style={style.a} to={item.path}>
              {item.label}
            </NavLink>
          </li>
        ))}
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
