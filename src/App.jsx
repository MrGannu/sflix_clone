import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './layout/Layout'
import NoPage from './pages/NoPage'
import Details from './components/Details'
import CreateMovie from './crud/CreateMovie'

const App = () => {
  return (
    <div className='app_div'>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/create-movies' element={<CreateMovie />} />
          <Route path="details/:title/:id" element={<Details />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App