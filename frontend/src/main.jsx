import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { NoteProvider } from "./components/context/NoteContext.jsx"


ReactDOM.createRoot(
  document.getElementById('root')
)
  .render(

    <NoteProvider>

      <App />

    </NoteProvider>

  )