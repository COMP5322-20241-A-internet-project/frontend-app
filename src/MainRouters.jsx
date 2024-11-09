import React from 'react'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard'
import Food from "./pages/Food"
import Product from './pages/Product';

const MainRouters = () => {
  return (
    <Router>
      <Dashboard>
        <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/food" element={<Food/>} />
          <Route path="/product/:id" element={<Product/>}/>
          <Route path="*" element={<div><h2>404 Page not found</h2></div>}/>
        </Routes>
        </Dashboard>
    </Router>
  )
}

export default MainRouters