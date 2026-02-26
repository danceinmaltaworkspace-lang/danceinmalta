import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from '../components/CloudinaryImage'
import './DateEventsPage.css'

const DateEventsPage = () => {
  const { dateStr } = useParams()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setEvents(eventsData)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const toDateStr = (d) => {
    if (!d) return ''
    if (typeof d === 'string') return d.slice(0, 10)
    if (typeof d?.toDate === 'function') {
      const dt = d.toDate()
      return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`
    }
    if (d instanceof Date) {
      return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
    }
    return ''
  }

  const dateEvents = events.filter(event => {
    if (toDateStr(event.date) === dateStr) return true
    if (Array.isArray(event.extraDates) && event.extraDates.length > 0) {
      return event.extraDates.some(ed => toDateStr(ed) === dateStr)
    }
    return false
  })

  const formatDate = (date) => {
    return date.toLocaleDateString(language === 'IT' ? 'it-IT' : language === 'ES' ? 'es-ES' : language === 'FR' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleEventClick = (event) => {
    if (event?.externalLink) {
      window.open(event.externalLink, '_blank', 'noopener,noreferrer')
    }
  }

  const displayDate = dateStr ? (() => {
    const [y, m, d] = dateStr.split('-').map(Number)
    return formatDate(new Date(y, m - 1, d))
  })() : ''

  if (loading) {
    return (
      <div className="page-container page-animate date-events-page">
        <div className="page-header date-events-header">
          <div className="container">
            <Link to="/events" className="date-events-back">← {t.events}</Link>
            <h1>{t.calendarTitle}</h1>
          </div>
        </div>
        <div className="container date-events-loading">
          <p>{language === 'IT' ? 'Caricamento...' : language === 'EN' ? 'Loading...' : language === 'ES' ? 'Cargando...' : 'Chargement...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container page-animate date-events-page">
      <div className="page-header date-events-header">
        <div className="container">
          <Link to="/events" className="date-events-back">← {t.events}</Link>
          <h1>{displayDate}</h1>
          <p className="date-events-subtitle">
            {dateEvents.length === 0
              ? t.noEvents
              : dateEvents.length === 1
                ? `1 ${t.eventSingular}`
                : `${dateEvents.length} ${t.eventPlural}`}
          </p>
        </div>
      </div>

      <div className="container date-events-content">
        {dateEvents.length === 0 ? (
          <div className="date-events-empty">
            <p>{t.noEvents}</p>
            <Link to="/events" className="date-events-btn-back">{t.events}</Link>
          </div>
        ) : (
          <div className="date-events-grid">
            {dateEvents.map((event, idx) => {
              const eventDate = event.date?.toDate ? event.date.toDate() : new Date(event.date)
              return (
                <article
                  key={event.id}
                  className="date-event-card"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                  onClick={() => handleEventClick(event)}
                >
                  {event.imageId && (
                    <div className="date-event-card-image">
                      <CloudinaryImage
                        imageId={event.imageId}
                        alt={event.title}
                        width={600}
                        height={340}
                        crop="fill"
                      />
                    </div>
                  )}
                  {!event.imageId && <div className="date-event-card-placeholder" />}
                  <div className="date-event-card-body">
                    <h3>{event.title}</h3>
                    <p className="date-event-date">{formatDate(eventDate)}</p>
                    {event.location && <p className="date-event-location">📍 {event.location}</p>}
                    {event.description && <p className="date-event-description">{event.description}</p>}
                    {event.externalLink && (
                      <span className="date-event-cta">{t.buyTickets} →</span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default DateEventsPage
