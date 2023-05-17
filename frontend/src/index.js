import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { UserContext } from './contexts/userContext'

const root = document.getElementById('root')

createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContext.Provider value={{}}>
        <App />
      </UserContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
)

reportWebVitals()
