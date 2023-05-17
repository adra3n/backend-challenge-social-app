import React, { useState, useEffect } from 'react'
import Welcome from './modules/welcome'
import Home from './modules/home'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')
  const [page, setPage] = useState('welcome')

  useEffect(() => {
    if (token) {
      setPage('home')
    }
  }, [token])

  switch (page) {
    case 'home':
      return (
        <div className="App">
          {' '}
          <Home user={user} token={token} />{' '}
        </div>
      )
    default:
      return (
        <div className="App">
          <Welcome setUser={setUser} setToken={setToken} setPage={setPage} />{' '}
        </div>
      )
  }
}

export default App
