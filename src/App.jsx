import { Route, Routes } from 'react-router-dom'

import './components/App.css'
import Home from './components/Home.jsx'
import PokeApi from './components/PokeApi.jsx'
import Navbar from './components/Navbar.jsx'

function App () {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/PokeApi' element={<PokeApi />} />
      </Routes>

    </>
  )
}

export default App
