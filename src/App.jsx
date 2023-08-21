import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './components/App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import PokeApi from './components/PokeApi'
import PrimeraGeneracion from './components/PrimeraGeneracion'
import SegundaGeneracion from './components/SegundaGeneracion'

function App () {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/PokeApi' element={<PokeApi />} />
        <Route path='/PrimeraGeneracion' element={<PrimeraGeneracion />} />
        <Route path='/SegundaGeneracion' element={<SegundaGeneracion />} />
      </Routes>
    </>
  )
}

export default App
