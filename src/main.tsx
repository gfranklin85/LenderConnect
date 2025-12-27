import React from 'react'
import ReactDOM from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import LenderConnect from './components/LenderConnect'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LenderConnect />
    <Analytics />
  </React.StrictMode>,
)
