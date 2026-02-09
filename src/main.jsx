import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('Errore app:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif', maxWidth: '600px', margin: '2rem auto' }}>
          <h1 style={{ color: '#c00' }}>Qualcosa è andato storto</h1>
          <p>{this.state.error?.message || 'Errore sconosciuto'}</p>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>Apri la console del browser (F12) per i dettagli.</p>
        </div>
      )
    }
    return this.props.children
  }
}

const root = document.getElementById('root')
if (!root) {
  console.error('Elemento #root non trovato in index.html')
} else {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
}
