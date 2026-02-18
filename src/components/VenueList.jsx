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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubVenues = onSnapshot(
      query(collection(db, 'venues'), orderBy('name', 'asc')),
      (snap) => setVenues(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    )
    return () => unsubVenues()
  }, [])

  useEffect(() => {
    const unsubEvents = onSnapshot(
      query(collection(db, 'events'), orderBy('date', 'asc')),
      (snap) => {
        setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setLoading(false)
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

  const venuesWithEvents = venues.filter(v =>
    events.some(e => e.venueId === v.id)
  )

  if (loading || venuesWithEvents.length === 0) return null

  return (
    <div className="venue-list-section">
      <h2 className="venue-list-heading">{t.venuesHeading || 'Locali'}</h2>
      <div className="venue-list">
        {venuesWithEvents.map(venue => {
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
                <h3 className="venue-card-name">{venue.name}</h3>
                {venue.address && <p className="venue-card-address">{venue.address}</p>}
              </div>
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
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VenueList
