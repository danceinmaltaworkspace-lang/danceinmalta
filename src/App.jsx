import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Events from './pages/Events'
import Stay from './pages/Stay'
import Contacts from './pages/Contacts'
import DateEventsPage from './pages/DateEventsPage'
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'
import Privacy from './pages/Privacy'
import Cookies from './pages/Cookies'
import CookieConsent from './components/CookieConsent'
import './App.css'

const Layout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/events" element={<Layout><Events /></Layout>} />
            <Route path="/events/date/:dateStr" element={<Layout><DateEventsPage /></Layout>} />
            <Route path="/stay" element={<Layout><Stay /></Layout>} />
            <Route path="/contacts" element={<Layout><Contacts /></Layout>} />
            <Route path="/privacy-policy" element={<Layout><Privacy /></Layout>} />
            <Route path="/cookie-policy" element={<Layout><Cookies /></Layout>} />
          </Routes>
          <CookieConsent />
        </div>
      </Router>
    </LanguageProvider>
  )
}

export default App
