import React from 'react'
import './Home.css'

function Home () {
  return (
    <div className='home-container'>
      <header className='header text-center'>
        <h1 className='display-3 title'>Página Sobre Pokémon</h1>
      </header>
      <main className='main-content text-center'>
        <h2 className='h3 construction-text'>Página en Construcción <span>👷🏻‍♂️</span> o en Vacaciones <span>🏖️</span></h2>
        <p className='lead description'>
          Estamos siguiendo un concepto 'Slow Web', donde cada pixel se coloca con amor y
          cada línea de código es meditada profundamente. ¡Prepárate para quedarte asombrado! Pero Oye,
          mientras tanto, puedes curiosear los cambios <span>😃</span>
        </p>
      </main>
      <footer className='footer text-center'>
        <p className='small footer-text'>&copy; 2023 Azrael. Todos los derechos reservados, incluso los muy relajados.</p>
      </footer>
    </div>
  )
}

export default Home
