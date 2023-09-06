import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function GeneracionAllList () {
  const [generations, setGenerations] = useState([])

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/generation/')
      .then((res) => res.json())
      .then(({ results }) => setGenerations(results))
      .catch((e) => console.log(e))
  }, [])

  return (
    <div style={style.div}>
      <h2 style={style.h2}>Lista de Generaciones</h2>
      <ul style={style.ul}>
        {generations.map((generation) => (
          <li style={style.li} key={generation.name}>
            <Link to={`/generation/${generation.name}`}>{generation.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GeneracionAllList

const style = {
  div: {
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItem: 'center'
  },
  li: {
    fontSize: '20px',
    textAlign: 'center',
    padding: '10px'
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
  h2: {
    fontSize: '30px',
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center'
  }
}
