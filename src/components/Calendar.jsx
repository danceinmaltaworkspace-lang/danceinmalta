import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from './CloudinaryImage'
import './Calendar.css'

const Calendar = () => {
  const { language } = useLanguage()
  const navigate = useNavigate()
  const t = translations[language]
  const [events, setEvents] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('date', 'asc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      console.log('[Calendar] Events loaded:', eventsData.map(e => ({
        title: e.title,
        extraDates: e.extraDates,
        extraDatesType: e.extraDates ? typeof e.extraDates[0] : 'none'
      })))
      setEvents(eventsData)
    })

    return () => unsubscribe()
  }, [])

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  // Convert ANY date value to 'YYYY-MM-DD' — handles all Firestore/JS formats
  const toDateStr = (d) => {
    if (!d) return ''
    try {
      // Plain string '2026-04-15' or ISO string
      if (typeof d === 'string') return d.slice(0, 10)
      // Firestore Timestamp with .toDate() method
      if (typeof d.toDate === 'function') {
        const dt = d.toDate()
        return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`
      }
      // Plain Firestore Timestamp object { seconds, nanoseconds }
      if (typeof d.seconds === 'number') {
        const dt = new Date(d.seconds * 1000)
        return `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}-${String(dt.getDate()).padStart(2,'0')}`
      }
      // JS Date object
      if (d instanceof Date) {
        return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
      }
    } catch {
      return ''
    }
    return ''
  }

  const getEventsForDate = (date) => {
    if (!date) return []
    const dateStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`

    return events.filter(event => {
      if (toDateStr(event.date) === dateStr) return true
      if (Array.isArray(event.extraDates) && event.extraDates.length > 0) {
        return event.extraDates.some(ed => toDateStr(ed) === dateStr)
      }
      return false
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString(language === 'IT' ? 'it-IT' : language === 'ES' ? 'es-ES' : language === 'FR' ? 'fr-FR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleEventCardClick = (event) => {
    setSelectedEvent(event)
  }

  const handleCloseModal = () => setSelectedEvent(null)

  const handleBuyTickets = (event) => {
    if (event?.externalLink) {
      window.open(event.externalLink, '_blank', 'noopener,noreferrer')
    }
    setSelectedEvent(null)
  }

  const getEventDateFormatted = (event) => {
    const d = event?.date?.toDate ? event.date.toDate() : event?.date ? new Date(event.date) : null
    return d ? formatDate(d) : ''
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = language === 'IT' 
    ? ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
    : language === 'ES'
    ? ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    : language === 'FR'
    ? ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const dayNames = language === 'IT'
    ? ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
    : language === 'ES'
    ? ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    : language === 'FR'
    ? ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : []

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>{t.calendarTitle}</h2>
        <div className="calendar-nav">
          <button onClick={goToPreviousMonth} className="calendar-nav-btn">‹</button>
          <span className="calendar-month-year">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={goToNextMonth} className="calendar-nav-btn">›</button>
        </div>
      </div>

      <div className="calendar-scroll-area">
      <div className="calendar-wrapper">
        <div className="calendar-grid">
          <div className="calendar-weekdays">
            {dayNames.map((day, index) => (
              <div key={index} className="calendar-weekday">{day}</div>
            ))}
          </div>
          <div className="calendar-days">
            {days.map((day, index) => {
              const dayEvents = day ? getEventsForDate(day) : []
              const isToday = day && day.toDateString() === new Date().toDateString()
              const isSelected = selectedDate && day && day.toDateString() === selectedDate.toDateString()

              const handleDayClick = (day) => {
                if (!day) return
                const dayEvents = getEventsForDate(day)
                if (dayEvents.length > 0) {
                  // Use local date to avoid timezone issues
                  const year = day.getFullYear()
                  const month = String(day.getMonth() + 1).padStart(2, '0')
                  const dayNum = String(day.getDate()).padStart(2, '0')
                  const dateStr = `${year}-${month}-${dayNum}`
                  navigate(`/events/date/${dateStr}`)
                } else {
                  setSelectedDate(day)
                }
              }

              return (
                <div
                  key={index}
                  className={`calendar-day ${!day ? 'empty' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                  onClick={() => day && handleDayClick(day)}
                >
                  {day && (
                    <>
                      <span className="calendar-day-number">{day.getDate()}</span>
                      {dayEvents.length > 0 && (
                        <div className="calendar-day-events">
                          <span className="calendar-day-badge" title={dayEvents.map(e => e.title).join(', ')}>
                            {dayEvents.length} {dayEvents.length === 1 ? t.eventSingular : t.eventPlural}
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {selectedDate && (
          <div className="calendar-events-panel">
            <h3>{formatDate(selectedDate)}</h3>
            {selectedDateEvents.length > 0 ? (
              <div className="events-list calendar-events-list">
                {selectedDateEvents.map((event, idx) => (
                  <div
                    key={event.id}
                    className="event-item calendar-event-item"
                    style={{ animationDelay: `${idx * 0.08}s` }}
                    onClick={() => handleEventCardClick(event)}
                  >
                    {event.imageId && (
                      <div className="event-item-image">
                        <CloudinaryImage
                          imageId={event.imageId}
                          alt={event.title}
                          width={600}
                          height={800}
                          crop="fill"
                          quality="auto:best"
                        />
                      </div>
                    )}
                    <div className="event-item-content">
                      <h4>{event.title}</h4>
                      {event.location && <p className="event-location">📍 {event.location}</p>}
                      {event.description && <p className="event-description">{event.description}</p>}
                      <span className="event-preview-cta">{t.buyTickets} →</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-events">{t.noEvents}</p>
            )}
          </div>
        )}

        {/* Modal anteprima evento */}
        {selectedEvent && (
          <div className="calendar-modal-overlay" onClick={handleCloseModal}>
            <div className="calendar-modal" onClick={e => e.stopPropagation()}>
              <button type="button" className="calendar-modal-close" onClick={handleCloseModal} aria-label={t.close}>
                ×
              </button>
              <div className="calendar-modal-image">
                {selectedEvent.imageId ? (
                  <CloudinaryImage
                    imageId={selectedEvent.imageId}
                    alt={selectedEvent.title}
                    width={700}
                    height={933}
                    crop="fill"
                    quality="auto:best"
                  />
                ) : (
                  <div className="calendar-modal-placeholder" />
                )}
              </div>
              <div className="calendar-modal-body">
                <h3 className="calendar-modal-title">{selectedEvent.title}</h3>
                <p className="calendar-modal-date">{getEventDateFormatted(selectedEvent)}</p>
                {selectedEvent.location && (
                  <p className="calendar-modal-location">📍 {selectedEvent.location}</p>
                )}
                {selectedEvent.description && (
                  <p className="calendar-modal-description">{selectedEvent.description}</p>
                )}
                <div className="calendar-modal-actions">
                  <button type="button" className="calendar-modal-btn secondary" onClick={handleCloseModal}>
                    {t.close}
                  </button>
                  {selectedEvent.externalLink && (
                    <button
                      type="button"
                      className="calendar-modal-btn primary"
                      onClick={() => handleBuyTickets(selectedEvent)}
                    >
                      {t.buyTickets} →
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </div>
  )
}

export default Calendar
