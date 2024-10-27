import React from 'react'
import Home from './pages/Home.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./components/Dashboard/Dashboard.js";

const MainRouters = () => {
  return (
    <Router>
      <Dashboard>
        <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<div><h2>404 Page not found</h2></div>}/>
        </Routes>
        </Dashboard>
    </Router>
  )
}

export default MainRouters