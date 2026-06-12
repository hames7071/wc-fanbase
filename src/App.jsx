import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

export default function App(){
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/admin" element={<Admin/>} />
        </Routes>
      </div>
    </div>
  )
}

function Home(){
  return (
    <div className="card text-center space-y-4">
      <h1 className="text-2xl font-bold text-gold">World Cup Fanbase Portal</h1>
      <p>Join the fanbase — register or login with your Submission ID.</p>
      <div className="flex gap-3 justify-center">
        <Link to="/register" className="px-4 py-2 bg-pitch rounded text-white">Register</Link>
        <Link to="/login" className="px-4 py-2 border border-gold rounded text-gold">Login</Link>
      </div>
    </div>
  )
}
