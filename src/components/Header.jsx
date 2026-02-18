import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from './CloudinaryImage'
import './Header.css'

const Header = () => {
  const { language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const location = useLocation()
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const closeDropdown = () => setIsLangDropdownOpen(false)
    if (isLangDropdownOpen) {
      document.addEventListener('click', closeDropdown)
      return () => document.removeEventListener('click', closeDropdown)
    }
  }, [isLangDropdownOpen])

  const languages = ['IT', 'EN', 'ES', 'FR']
  const menuItems = [
    { key: 'home', path: '/' },
    { key: 'events', path: '/events' },
    { key: 'stay', path: '/stay' }
  ]

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <CloudinaryImage imageId="immagine_senza_sfondo_p4usev" alt="Dance in Malta" width={180} height={50} crop="fit" className="logo-img" />
          </Link>
        </div>

        <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-menu">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <li key={item.key}>
                  <Link to={item.path} className={isActive ? 'active' : ''}>{t[item.key]}</Link>
                </li>
              )
            })}
            <li>
              <Link to="/contacts" className={location.pathname === '/contacts' ? 'active' : ''}>{t.contacts}</Link>
            </li>
            <li>
              <a href="https://wa.me/35699027173" className="whatsapp-link" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="language-selector language-selector-desktop">
            {languages.map((lang) => (
              <button
                key={lang}
                className={`lang-btn ${language === lang ? 'active' : ''}`}
                onClick={() => setLanguage(lang)}
              >
                {lang}
              </button>
            ))}
          </div>
          <div className={`language-selector language-selector-mobile ${isLangDropdownOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="lang-btn lang-btn-trigger"
              onClick={(e) => {
                e.stopPropagation()
                setIsLangDropdownOpen(!isLangDropdownOpen)
              }}
              aria-expanded={isLangDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Seleziona lingua"
            >
              {language}
              <span className="lang-dropdown-arrow">▼</span>
            </button>
            {isLangDropdownOpen && (
              <div className="lang-dropdown">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    className={`lang-dropdown-item ${language === lang ? 'active' : ''}`}
                    onClick={() => {
                      setLanguage(lang)
                      setIsLangDropdownOpen(false)
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
