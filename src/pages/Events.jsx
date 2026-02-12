import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import Calendar from '../components/Calendar'
import './Pages.css'

const Events = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="page-container page-animate">
      <div className="page-header">
        <h1>{t.events}</h1>
        <p>{t.eventsSubtitle}</p>
      </div>
      <Calendar />
    </div>
  )
}

export default Events
