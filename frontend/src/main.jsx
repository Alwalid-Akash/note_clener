import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { NoteProvider } from "./components/context/NoteContext.jsx"
import { AuthProvider } from "./components/context/AuthContext.jsx";


ReactDOM.createRoot(
  document.getElementById('root')
)
  .render(
    <AuthProvider>
      <NoteProvider>

        <App />

      </NoteProvider>
    </AuthProvider>
  )