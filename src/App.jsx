import React from 'react'
import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/App.css'
import NavbarMenu from './components/Navbar'
import Home from './components/Home'
import PokeApi from './components/PokeApi'
import GeneracionAll from './components/GeneracionAll'
// import GeneracionAllList from './components/GeneracionAllList'

function App () {
  return (
    <div className='app'>
      <NavbarMenu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/PokeApi' element={<PokeApi />} />
        <Route path='/generation/:id' element={<GeneracionAll />} />
      </Routes>
    </div>
  )
}

export default App
