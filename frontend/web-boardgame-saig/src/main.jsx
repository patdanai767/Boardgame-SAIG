import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './contexts/AuthContext'
import "./main.css"

ReactDOM.createRoot(document.getElementById('root')).render(

  <AuthContextProvider>
    <App />
  </AuthContextProvider>

)
