import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from './CloudinaryImage'
import './UpcomingEvents.css'

const UPCOMING_LIMIT = 6
const AUTO_SCROLL_INTERVAL = 3000

const UpcomingEvents = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [events, setEvents] = useState([])
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const gridRef = useRef(null)
  const autoScrollRef = useRef(null)
  const isPausedRef = useRef(false)

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const all = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const toDate = (rawDate) => {
        if (!rawDate) return null
        if (typeof rawDate.toDate === 'function') return rawDate.toDate()
        if (typeof rawDate.seconds === 'number') return new Date(rawDate.seconds * 1000)
        const d = new Date(rawDate)
        return isNaN(d) ? null : d
      }

      // Each event appears ONCE — with the next upcoming date among all its dates
      const withNextDate = []
      all.forEach(event => {
        const allRawDates = [event.date, ...(Array.isArray(event.extraDates) ? event.extraDates : [])]

        let nextRaw = null
        let nextDate = null

        allRawDates.forEach(raw => {
          const d = toDate(raw)
          if (!d || d < today) return
          if (!nextDate || d < nextDate) {
            nextDate = d
            nextRaw = raw
          }
        })

        if (nextDate) {
          withNextDate.push({ ...event, date: nextRaw, _instanceDate: nextDate })
        }
      })

      withNextDate.sort((a, b) => a._instanceDate - b._instanceDate)
      setEvents(withNextDate.slice(0, UPCOMING_LIMIT))
    })
    return () => unsubscribe()
  }, [])

  const scrollToIndex = useCallback((index, smooth = true) => {
    const grid = gridRef.current
    if (!grid) return
    const card = grid.children[index]
    if (!card) return
    grid.scrollTo({ left: card.offsetLeft - grid.offsetLeft, behavior: smooth ? 'smooth' : 'instant' })
  }, [])

  const startAutoScroll = useCallback(() => {
    if (autoScrollRef.current) clearInterval(autoScrollRef.current)
    autoScrollRef.current = setInterval(() => {
      if (isPausedRef.current || !gridRef.current) return
      setCurrentEventIndex(prev => {
        const next = prev + 1 >= events.length ? 0 : prev + 1
        scrollToIndex(next)
        return next
      })
    }, AUTO_SCROLL_INTERVAL)
  }, [events.length, scrollToIndex])

  // Start auto-scroll only on mobile
  useEffect(() => {
    if (events.length < 2) return
    const isMobile = window.innerWidth <= 768
    if (!isMobile) return
    startAutoScroll()
    return () => clearInterval(autoScrollRef.current)
  }, [events.length, startAutoScroll])

  const handleTouchStart = (e) => {
    isPausedRef.current = true
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(0)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      isPausedRef.current = false
      return
    }
    const distance = touchStart - touchEnd
    if (Math.abs(distance) > 50) {
      const isLeftSwipe = distance > 0
      setCurrentEventIndex(prev => {
        const next = isLeftSwipe
          ? Math.min(prev + 1, events.length - 1)
          : Math.max(prev - 1, 0)
        scrollToIndex(next)
        return next
      })
    }
    setTouchStart(0)
    setTouchEnd(0)
    // Resume auto-scroll after 4s of inactivity
    setTimeout(() => { isPausedRef.current = false }, 4000)
  }

  const handleEventClick = (event) => {
    if (event.externalLink) {
      window.open(event.externalLink, '_blank', 'noopener,noreferrer')
    }
  }

  const formatEventDate = (rawDate) => {
    if (!rawDate) return ''
    let d
    if (typeof rawDate.toDate === 'function') d = rawDate.toDate()
    else if (typeof rawDate.seconds === 'number') d = new Date(rawDate.seconds * 1000)
    else d = new Date(rawDate)
    if (isNaN(d)) return ''
    return d.toLocaleDateString(
      language === 'IT' ? 'it-IT' : language === 'ES' ? 'es-ES' : language === 'FR' ? 'fr-FR' : 'en-GB',
      { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' }
    )
  }

  return (
    <section id="events" className="upcoming-events section">
      <div className="container">
        <h2 className="section-title">{t.upcomingEvents}</h2>
        <p className="section-subtitle">
          {t.eventsSubtitle}
        </p>
        {events.length === 0 ? (
          <p className="upcoming-events-empty">{t.noUpcomingEvents}</p>
        ) : (
          <>
            <div
              ref={gridRef}
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
                >
                  <div className="event-image">
                    {event.imageId ? (
                      <CloudinaryImage
                        imageId={event.imageId}
                        alt={event.title}
                        width={600}
                        height={800}
                        crop="fill"
                        quality="auto:best"
                        loading="eager"
                      />
                    ) : (
                      <div className="image-placeholder">
                        <span>{event.title || 'Event'}</span>
                      </div>
                    )}
                  </div>
                  <div className="event-content">
                    <div className="event-meta">
                      <span className="event-date-badge">📅 {formatEventDate(event.date)}</span>
                      {event.location && (
                        <span className="event-location-badge">📍 {event.location}</span>
                      )}
                    </div>
                    <h3>{event.title}</h3>
                    {event.description && (
                      <p className="event-description-preview">{event.description}</p>
                    )}
                    {event.externalLink ? (
                      <button
                        type="button"
                        className="event-btn"
                        onClick={() => handleEventClick(event)}
                      >
                        {t.buyTickets}
                      </button>
                    ) : (
                      <Link to="/events" className="event-btn">{t.learnMore}</Link>
                    )}
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
          <Link to="/events" className="see-all-btn">{t.seeAll}</Link>
        </div>
      </div>
    </section>
  )
}

export default UpcomingEvents
