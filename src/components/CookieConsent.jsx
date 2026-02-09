import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './CookieConsent.css'

const STORAGE_KEY = 'cookie_consent_danceinmalta'

const CookieConsent = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [visible, setVisible] = useState(false)
  const [showAgain, setShowAgain] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) setVisible(true)
  }, [])

  useEffect(() => {
    const handler = () => setShowAgain(true)
    window.addEventListener('showCookieConsent', handler)
    return () => window.removeEventListener('showCookieConsent', handler)
  }, [])

  useEffect(() => {
    if (showAgain) setVisible(true)
  }, [showAgain])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected')
    setVisible(false)
  }

  const openPreferences = () => {
    setVisible(false)
  }

  if (!visible) return null

  const cookieText = language === 'IT'
    ? 'Per fornire le migliori esperienze, utilizziamo tecnologie come i cookie per memorizzare e/o accedere alle informazioni del dispositivo. Il consenso a queste tecnologie ci permetterà di elaborare dati come il comportamento di navigazione o ID unici su questo sito.'
    : language === 'ES'
    ? 'Para ofrecer la mejor experiencia, utilizamos tecnologías como cookies para almacenar y/o acceder a la información del dispositivo. El consentimiento nos permite procesar datos como el comportamiento de navegación o identificadores únicos.'
    : language === 'FR'
    ? 'Pour offrir la meilleure expérience, nous utilisons des technologies telles que les cookies pour stocker et/ou accéder aux informations du terminal. Votre consentement nous permet de traiter des données comme le comportement de navigation ou des identifiants uniques.'
    : 'To provide the best experience, we use technologies such as cookies to store and/or access device information. Your consent allows us to process data such as browsing behaviour or unique IDs on this site.'

  const acceptLabel = language === 'IT' ? 'Accetta' : language === 'ES' ? 'Aceptar' : language === 'FR' ? 'Accepter' : 'Accept'
  const rejectLabel = language === 'IT' ? 'Rifiuta' : language === 'ES' ? 'Rechazar' : language === 'FR' ? 'Refuser' : 'Reject'
  const prefsLabel = language === 'IT' ? 'Preferenze' : language === 'ES' ? 'Preferencias' : language === 'FR' ? 'Préférences' : 'Preferences'

  return (
    <div className="cookie-consent" role="dialog" aria-label="Cookie consent">
      <div className="cookie-consent-inner">
        <p className="cookie-consent-text">
          {cookieText}
          {' '}
          <Link to="/cookie-policy" className="cookie-consent-link" onClick={openPreferences}>
            {t.cookiePolicy}
          </Link>
        </p>
        <div className="cookie-consent-actions">
          <Link to="/cookie-policy" className="cookie-consent-btn cookie-consent-btn-prefs" onClick={openPreferences}>
            {prefsLabel}
          </Link>
          <button type="button" className="cookie-consent-btn cookie-consent-btn-reject" onClick={reject}>
            {rejectLabel}
          </button>
          <button type="button" className="cookie-consent-btn cookie-consent-btn-accept" onClick={accept}>
            {acceptLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
