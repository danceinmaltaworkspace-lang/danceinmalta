import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import Calendar from '../components/Calendar'
import './Pages.css'

const CalendarPage = () => {
  const { language } = useLanguage()
  const t = translations[language]
  return (
    <div className="page-container page-animate">
      <div className="page-header">
        <h1>{t.calendarTitle}</h1>
      </div>
      <Calendar />
    </div>
  )
}

export default CalendarPage
