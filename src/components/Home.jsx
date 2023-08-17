import React from 'react'
import './Home.css'

function Home () {
  return (
    <div className="home-container">
      <header className="header">
        <h1 className="title">Pagina Sobre Pokemons</h1>
      </header>
      <main className="main-content">
        <h2 className="construction-text">Página en Construcción 👷🏻‍♂️ o en Vacaciones? 🏖️</h2>
        <p className="description">
          Estamos siguiendo un concepto "Slow Web", donde cada pixel se coloca con amor y
          cada línea de código es meditada profundamente. ¡Prepárate para quedarte asombrado!. Pero Oye!
          mientras tanto puedes curiosear los cambios 😃
        </p>
      </main>
      <footer className="footer">
        <p className="footer-text">© 2023 Azrael. Todos los derechos reservados, incluso los muy relajados.</p>
      </footer>
    </div>
  )
}

export default Home
