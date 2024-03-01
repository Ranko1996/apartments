import React from 'react'
import './App.css'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ApartmentDetails from './pages/apartmentDetails/ApartmentDetails';

function App() {

  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apartment/:id" element={<ApartmentDetails />} />
      </Routes>
    </Router>
  )
}

export default App
