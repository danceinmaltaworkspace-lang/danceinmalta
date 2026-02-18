import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './VenueList.css'

const CLOUD_BASE = 'https://res.cloudinary.com/dk99zyawv/image/upload'

const VenueList = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const navigate = useNavigate()
  const [venues, setVenues] = useState([])
  const [events, setEvents] = useState([])
  const [loadingVenues, setLoadingVenues] = useState(true)
  const [loadingEvents, setLoadingEvents] = useState(true)
  const [venueError, setVenueError] = useState(null)

  useEffect(() => {
    const unsubVenues = onSnapshot(
      query(collection(db, 'venues'), orderBy('name', 'asc')),
      (snap) => {
        setVenues(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoadingVenues(false)
        setVenueError(null)
      },
      (err) => {
        console.error('VenueList venues error:', err)
        setVenueError(err.message)
        setLoadingVenues(false)
      }
    )
    return () => unsubVenues()
  }, [])

  useEffect(() => {
    const unsubEvents = onSnapshot(
      query(collection(db, 'events'), orderBy('date', 'asc')),
      (snap) => {
        setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoadingEvents(false)
      },
      (err) => {
        console.error('VenueList events error:', err)
        setLoadingEvents(false)
      }
    )
    return () => unsubEvents()
  }, [])

  const handleEventClick = (event) => {
    const d = event.date?.toDate ? event.date.toDate() : new Date(event.date)
    const dateStr = d.toISOString().split('T')[0]
    navigate(`/events/date/${dateStr}`)
  }

  const formatEventDate = (date) => {
    if (!date) return ''
    const d = date?.toDate ? date.toDate() : new Date(date)
    return d.toLocaleDateString(
      language === 'IT' ? 'it-IT' : language === 'ES' ? 'es-ES' : language === 'FR' ? 'fr-FR' : 'en-GB',
      { day: 'numeric', month: 'long', year: 'numeric' }
    )
  }

  const loading = loadingVenues || loadingEvents

  // Non mostrare se ancora caricamento
  if (loading) return null

  // Errore Firebase rules: mostra messaggio utile solo in dev
  if (venueError) return null

  // Nessun locale creato
  if (venues.length === 0) return null

  return (
    <div className="venue-list-section">
      <h2 className="venue-list-heading">{t.venuesHeading || 'Locali'}</h2>
      <div className="venue-list">
        {venues.map(venue => {
          const venueEvents = events
            .filter(e => e.venueId === venue.id)
            .sort((a, b) => {
              const da = a.date?.toDate ? a.date.toDate() : new Date(a.date)
              const db2 = b.date?.toDate ? b.date.toDate() : new Date(b.date)
              return da - db2
            })

          return (
            <div key={venue.id} className="venue-card">
              <div className="venue-card-header">
                <div className="venue-card-header-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <h3 className="venue-card-name">{venue.name}</h3>
                  {venue.address && <p className="venue-card-address">{venue.address}</p>}
                  <span className="venue-card-count">
                    {venueEvents.length} {venueEvents.length === 1 ? (t.eventSingular || 'evento') : (t.eventPlural || 'eventi')}
                  </span>
                </div>
              </div>

              {venueEvents.length > 0 ? (
                <ul className="venue-events-list">
                  {venueEvents.map(event => (
                    <li
                      key={event.id}
                      className="venue-event-item"
                      onClick={() => handleEventClick(event)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleEventClick(event) }}
                    >
                      {event.imageId && (
                        <div className="venue-event-thumb">
                          <img
                            src={`${CLOUD_BASE}/w_80,h_80,c_fill,q_auto,f_auto/${event.imageId}`}
                            alt={event.title}
                          />
                        </div>
                      )}
                      <div className="venue-event-info">
                        <span className="venue-event-title">{event.title}</span>
                        <span className="venue-event-date">{formatEventDate(event.date)}</span>
                        {event.location && <span className="venue-event-location">{event.location}</span>}
                      </div>
                      <span className="venue-event-arrow">→</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="venue-no-events">{t.venueNoEvents || 'Nessun evento in programma'}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VenueList
