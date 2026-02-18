import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from './CloudinaryImage'
import './UpcomingEvents.css'

const UPCOMING_LIMIT = 6

const UpcomingEvents = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [events, setEvents] = useState([])
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const all = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const upcoming = all
        .filter(event => {
          const d = event.date?.toDate ? event.date.toDate() : new Date(event.date)
          return d >= today
        })
        .slice(0, UPCOMING_LIMIT)
      setEvents(upcoming)
    })
    return () => unsubscribe()
  }, [])

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentEventIndex < events.length - 1) {
      setCurrentEventIndex(prev => prev + 1)
    }
    if (isRightSwipe && currentEventIndex > 0) {
      setCurrentEventIndex(prev => prev - 1)
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  const handleEventClick = (event) => {
    if (event.externalLink) {
      window.open(event.externalLink, '_blank', 'noopener,noreferrer')
    }
  }

  const formatDate = (date) => {
    if (!date) return ''
    const d = date?.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' }).toUpperCase()
  }

  return (
    <section id="events" className="upcoming-events section">
      <div className="container">
        <span className="upcoming-eyebrow">{t.upcomingEvents}</span>
        <h2 className="upcoming-title">{t.eventsSubtitle}</h2>

        {events.length === 0 ? (
          <p className="upcoming-events-empty">{t.noUpcomingEvents}</p>
        ) : (
          <>
            <div
              className="events-grid"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`event-card ${index === currentEventIndex ? 'mobile-active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleEventClick(event)}
                >
                  <div className="event-image">
                    {event.imageId ? (
                      <CloudinaryImage
                        imageId={event.imageId}
                        alt={event.title}
                        width={600}
                        height={400}
                        crop="fill"
                      />
                    ) : (
                      <div className="image-placeholder">
                        <span>{event.title || 'Event'}</span>
                      </div>
                    )}
                    <div className="event-card-overlay" />
                    {event.date && (
                      <span className="event-date-badge">{formatDate(event.date)}</span>
                    )}
                    <div className="event-card-body">
                      <h3 className="event-card-title">{event.title}</h3>
                      {event.location && (
                        <span className="event-card-location">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                          {event.location}
                        </span>
                      )}
                      {event.externalLink ? (
                        <button type="button" className="event-btn" onClick={(e) => { e.stopPropagation(); handleEventClick(event) }}>
                          {t.buyTickets} →
                        </button>
                      ) : (
                        <Link to="/events" className="event-btn" onClick={e => e.stopPropagation()}>{t.learnMore} →</Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="events-mobile-dots">
              {events.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`events-mobile-dot ${index === currentEventIndex ? 'active' : ''}`}
                  onClick={() => setCurrentEventIndex(index)}
                  aria-label={`Go to event ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
        <div className="section-footer">
          <Link to="/events" className="see-all-btn">{t.seeAll} →</Link>
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents
