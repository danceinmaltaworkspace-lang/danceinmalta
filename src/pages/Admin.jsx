import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, addDoc, updateDoc, deleteDoc, doc, query, onSnapshot, orderBy, getDocs } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './Admin.css'

const ADMIN_EMAIL = 'danceinmalta.workspace@gmail.com'

const Admin = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('events')

  // Events
  const [events, setEvents] = useState([])
  const [showEventForm, setShowEventForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [eventForm, setEventForm] = useState({
    title: '', date: '', extraDates: [], location: '', description: '', imageId: '', externalLink: '', venueId: ''
  })

  // Recurrence quick-fill
  const [recurrence, setRecurrence] = useState({ startDate: '', endDate: '', dayOfWeek: '3' })

  // Rooms (Stay)
  const [rooms, setRooms] = useState([])
  const [showRoomForm, setShowRoomForm] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [roomForm, setRoomForm] = useState({
    name: '', location: '', rating: '4', price: '', features: '', imageId: '', externalLink: ''
  })

  // Venues (Locali)
  const [venues, setVenues] = useState([])
  const [showVenueForm, setShowVenueForm] = useState(false)
  const [editingVenue, setEditingVenue] = useState(null)
  const [venueForm, setVenueForm] = useState({ name: '', address: '' })

  // Experiences
  const [expList, setExpList] = useState([])
  const [showExpForm, setShowExpForm] = useState(false)
  const [editingExp, setEditingExp] = useState(null)
  const [expForm, setExpForm] = useState({
    title: '', category: '', description: '', price: '', imageId: '', externalLink: ''
  })

  // Messages (contact form)
  const [messages, setMessages] = useState([])
  const [messagesError, setMessagesError] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setUser(currentUser)
        setLoading(false)
      } else {
        navigate('/admin/login')
      }
    })
    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    if (!user) return
    const unsubEvents = onSnapshot(
      query(collection(db, 'events'), orderBy('date', 'desc')),
      (snap) => setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    )
    return () => unsubEvents()
  }, [user])

  useEffect(() => {
    if (!user) return
    const unsubRooms = onSnapshot(
      query(collection(db, 'rooms'), orderBy('createdAt', 'desc')),
      (snap) => setRooms(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    )
    return () => unsubRooms()
  }, [user])

  useEffect(() => {
    if (!user) return
    const unsubVenues = onSnapshot(
      query(collection(db, 'venues'), orderBy('name', 'asc')),
      (snap) => setVenues(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    )
    return () => unsubVenues()
  }, [user])

  useEffect(() => {
    if (!user) return
    const unsubExp = onSnapshot(
      query(collection(db, 'experiences'), orderBy('createdAt', 'desc')),
      (snap) => setExpList(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    )
    return () => unsubExp()
  }, [user])

  useEffect(() => {
    if (!user) return
    setMessagesError(null)
    const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'))
    const unsubMessages = onSnapshot(
      q,
      (snap) => {
        setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })))
        setMessagesError(null)
      },
      (err) => {
        console.error('Admin messages snapshot error:', err)
        setMessagesError(err.message || 'Errore caricamento messaggi')
        getDocs(collection(db, 'contactMessages')).then(snap => {
          const list = snap.docs.map(d => ({ id: d.id, ...d.data() }))
          list.sort((a, b) => {
            const ta = a.createdAt?.toMillis?.() ?? 0
            const tb = b.createdAt?.toMillis?.() ?? 0
            return tb - ta
          })
          setMessages(list)
        }).catch(e => console.error(e))
      }
    )
    return () => unsubMessages()
  }, [user])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/admin/login')
    } catch (err) {
      console.error(err)
    }
  }

  const formatDate = (date) => {
    if (!date) return ''
    const d = date?.toDate ? date.toDate() : new Date(date)
    return d.toLocaleString(language === 'IT' ? 'it-IT' : 'en-GB')
  }

  // —— Events ——
  const handleEventSubmit = async (e) => {
    e.preventDefault()
    try {
      // extraDates stored as plain strings 'YYYY-MM-DD' to avoid timezone issues
      const extraDateStrings = (eventForm.extraDates || []).filter(d => d)
      console.log('[Admin] Saving event extraDates:', extraDateStrings)
      const payload = {
        title: eventForm.title,
        date: new Date(eventForm.date),
        extraDates: extraDateStrings,
        location: eventForm.location,
        description: eventForm.description,
        imageId: eventForm.imageId,
        externalLink: eventForm.externalLink,
        venueId: eventForm.venueId,
      }
      if (editingEvent) {
        await updateDoc(doc(db, 'events', editingEvent.id), payload)
      } else {
        await addDoc(collection(db, 'events'), { ...payload, createdAt: new Date() })
      }
      setEventForm({ title: '', date: '', extraDates: [], location: '', description: '', imageId: '', externalLink: '', venueId: '' })
      setEditingEvent(null)
      setShowEventForm(false)
    } catch (err) {
      console.error(err)
      alert('Error: ' + err.message)
    }
  }

  const handleEditEvent = (event) => {
    setEditingEvent(event)
    const d = event.date?.toDate ? event.date.toDate() : new Date(event.date)
    // extraDates are stored as strings 'YYYY-MM-DD', but handle legacy Timestamp too
    const extra = Array.isArray(event.extraDates)
      ? event.extraDates.map(ed => {
          if (typeof ed === 'string') return ed
          const dd = ed?.toDate ? ed.toDate() : new Date(ed)
          return `${dd.getFullYear()}-${String(dd.getMonth()+1).padStart(2,'0')}-${String(dd.getDate()).padStart(2,'0')}`
        })
      : []
    setEventForm({
      title: event.title || '',
      date: d.toISOString().split('T')[0],
      extraDates: extra,
      location: event.location || '',
      description: event.description || '',
      imageId: event.imageId || '',
      externalLink: event.externalLink || '',
      venueId: event.venueId || ''
    })
    setShowEventForm(true)
  }

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Eliminare questo evento?')) return
    try {
      await deleteDoc(doc(db, 'events', id))
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const generateRecurringDates = () => {
    const { startDate, endDate, dayOfWeek } = recurrence
    if (!startDate || !endDate || !dayOfWeek) {
      alert('Compila data inizio, data fine e giorno della settimana.')
      return
    }
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (start > end) { alert('La data di inizio deve essere prima della data di fine.'); return }

    const targetDay = parseInt(dayOfWeek, 10) // 0=Dom, 1=Lun, ..., 6=Sab
    const generated = []
    const cur = new Date(start)

    // Advance to first occurrence of targetDay
    while (cur.getDay() !== targetDay) {
      cur.setDate(cur.getDate() + 1)
    }

    while (cur <= end) {
      const str = `${cur.getFullYear()}-${String(cur.getMonth()+1).padStart(2,'0')}-${String(cur.getDate()).padStart(2,'0')}`
      generated.push(str)
      cur.setDate(cur.getDate() + 7)
    }

    if (generated.length === 0) {
      alert('Nessuna data trovata nel periodo selezionato per quel giorno.')
      return
    }

    // Merge with existing extraDates (avoid duplicates)
    const existing = eventForm.extraDates || []
    const merged = [...new Set([...existing, ...generated])]
    setEventForm(prev => ({ ...prev, extraDates: merged }))
    alert(`Aggiunte ${generated.length} date!`)
  }

  // —— Rooms ——
  const handleRoomSubmit = async (e) => {
    e.preventDefault()
    try {
      const features = roomForm.features
        ? roomForm.features.split(',').map(s => s.trim()).filter(Boolean)
        : []
      const payload = {
        name: roomForm.name.trim(),
        location: roomForm.location.trim(),
        rating: parseInt(roomForm.rating, 10) || 4,
        price: roomForm.price.trim(),
        features,
        imageId: (roomForm.imageId || '').trim(),
        externalLink: (roomForm.externalLink || '').trim()
      }
      if (editingRoom) {
        await updateDoc(doc(db, 'rooms', editingRoom.id), payload)
      } else {
        await addDoc(collection(db, 'rooms'), { ...payload, createdAt: new Date() })
      }
      setRoomForm({ name: '', location: '', rating: '4', price: '', features: '', imageId: '', externalLink: '' })
      setEditingRoom(null)
      setShowRoomForm(false)
    } catch (err) {
      console.error(err)
      alert('Error: ' + err.message)
    }
  }

  const handleEditRoom = (room) => {
    setEditingRoom(room)
    setRoomForm({
      name: room.name || '',
      location: room.location || '',
      rating: String(room.rating ?? 4),
      price: room.price || '',
      features: Array.isArray(room.features) ? room.features.join(', ') : '',
      imageId: room.imageId || '',
      externalLink: room.externalLink || ''
    })
    setShowRoomForm(true)
  }

  const handleDeleteRoom = async (id) => {
    if (!window.confirm(t.confirmDeleteRoom)) return
    try {
      await deleteDoc(doc(db, 'rooms', id))
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  // —— Venues ——
  const handleVenueSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { name: venueForm.name.trim(), address: venueForm.address.trim() }
      if (editingVenue) {
        await updateDoc(doc(db, 'venues', editingVenue.id), payload)
      } else {
        await addDoc(collection(db, 'venues'), { ...payload, createdAt: new Date() })
      }
      setVenueForm({ name: '', address: '' })
      setEditingVenue(null)
      setShowVenueForm(false)
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleEditVenue = (venue) => {
    setEditingVenue(venue)
    setVenueForm({ name: venue.name || '', address: venue.address || '' })
    setShowVenueForm(true)
  }

  const handleDeleteVenue = async (id) => {
    if (!window.confirm(t.confirmDeleteVenue || 'Eliminare questo locale?')) return
    try {
      await deleteDoc(doc(db, 'venues', id))
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  // —— Experiences ——
  const handleExpSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        title: expForm.title.trim(),
        category: expForm.category.trim(),
        description: expForm.description.trim(),
        price: expForm.price.trim(),
        imageId: expForm.imageId.trim(),
        externalLink: expForm.externalLink.trim(),
      }
      if (editingExp) {
        await updateDoc(doc(db, 'experiences', editingExp.id), payload)
      } else {
        await addDoc(collection(db, 'experiences'), { ...payload, createdAt: new Date() })
      }
      setExpForm({ title: '', category: '', description: '', price: '', imageId: '', externalLink: '' })
      setEditingExp(null)
      setShowExpForm(false)
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleEditExp = (exp) => {
    setEditingExp(exp)
    setExpForm({
      title: exp.title || '',
      category: exp.category || '',
      description: exp.description || '',
      price: exp.price || '',
      imageId: exp.imageId || '',
      externalLink: exp.externalLink || '',
    })
    setShowExpForm(true)
  }

  const handleDeleteExp = async (id) => {
    if (!window.confirm('Eliminare questa esperienza?')) return
    try {
      await deleteDoc(doc(db, 'experiences', id))
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  if (loading) {
    return <div className="admin-loading">Loading...</div>
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={handleLogout} className="logout-btn">{t.logout}</button>
      </div>

      <div className="admin-tabs">
        <button
          className={`admin-tab ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          {t.adminTabEvents}
        </button>
        <button
          className={`admin-tab ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          {t.adminTabRooms}
        </button>
        <button
          className={`admin-tab ${activeTab === 'venues' ? 'active' : ''}`}
          onClick={() => setActiveTab('venues')}
        >
          {t.adminTabVenues || 'Locali'}
        </button>
        <button
          className={`admin-tab ${activeTab === 'experiences' ? 'active' : ''}`}
          onClick={() => setActiveTab('experiences')}
        >
          {t.experiences || 'Esperienze'}
        </button>
        <button
          className={`admin-tab ${activeTab === 'messages' ? 'active' : ''}`}
          onClick={() => setActiveTab('messages')}
        >
          {t.adminTabMessages}
        </button>
      </div>

      <div className="admin-content">
        {/* —— EVENTI —— */}
        {activeTab === 'events' && (
          <>
            <div className="admin-actions">
              <button
                onClick={() => {
                  setShowEventForm(!showEventForm)
                  setEditingEvent(null)
                  setEventForm({ title: '', date: '', extraDates: [], location: '', description: '', imageId: '', externalLink: '', venueId: '' })
                }}
                className="add-event-btn"
              >
                {showEventForm ? t.cancel : t.addEvent}
              </button>
            </div>

            {showEventForm && (
              <div className="admin-form-container">
                <h2>{editingEvent ? t.editEvent : t.addEvent}</h2>
                <form onSubmit={handleEventSubmit} className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.eventTitle} *</label>
                      <input type="text" value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>{t.eventDate} * (data principale)</label>
                      <input type="date" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} required />
                    </div>
                  </div>

                  {/* Ricorrenza rapida */}
                  <div className="form-group recurrence-box">
                    <label className="recurrence-label">
                      ⚡ Ricorrenza rapida — genera date automaticamente
                    </label>
                    <div className="recurrence-row">
                      <div className="recurrence-field">
                        <span>Da</span>
                        <input
                          type="date"
                          value={recurrence.startDate}
                          onChange={e => setRecurrence(r => ({ ...r, startDate: e.target.value }))}
                        />
                      </div>
                      <div className="recurrence-field">
                        <span>A</span>
                        <input
                          type="date"
                          value={recurrence.endDate}
                          onChange={e => setRecurrence(r => ({ ...r, endDate: e.target.value }))}
                        />
                      </div>
                      <div className="recurrence-field">
                        <span>Ogni</span>
                        <select
                          value={recurrence.dayOfWeek}
                          onChange={e => setRecurrence(r => ({ ...r, dayOfWeek: e.target.value }))}
                        >
                          <option value="1">Lunedì</option>
                          <option value="2">Martedì</option>
                          <option value="3">Mercoledì</option>
                          <option value="4">Giovedì</option>
                          <option value="5">Venerdì</option>
                          <option value="6">Sabato</option>
                          <option value="0">Domenica</option>
                        </select>
                      </div>
                      <button
                        type="button"
                        className="generate-dates-btn"
                        onClick={generateRecurringDates}
                      >
                        Genera date
                      </button>
                    </div>
                  </div>

                  {/* Date aggiuntive (ripetizioni) */}
                  <div className="form-group">
                    <label style={{ marginBottom: '0.5rem', display: 'block' }}>
                      Date aggiuntive (ripetizioni) — opzionale
                    </label>
                    <div className="extra-dates-list">
                      {(eventForm.extraDates || []).map((d, idx) => (
                        <div key={idx} className="extra-date-row">
                          <input
                            type="date"
                            value={d}
                            onChange={e => {
                              const updated = [...eventForm.extraDates]
                              updated[idx] = e.target.value
                              setEventForm({ ...eventForm, extraDates: updated })
                            }}
                          />
                          <button
                            type="button"
                            className="remove-date-btn"
                            onClick={() => {
                              const updated = eventForm.extraDates.filter((_, i) => i !== idx)
                              setEventForm({ ...eventForm, extraDates: updated })
                            }}
                          >✕</button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add-date-btn"
                        onClick={() => setEventForm({ ...eventForm, extraDates: [...(eventForm.extraDates || []), ''] })}
                      >
                        + Aggiungi data
                      </button>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.eventLocation}</label>
                    <input type="text" value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>{t.eventDescription}</label>
                    <textarea value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} rows="4" />
                  </div>
                  <div className="form-group">
                    <label>{t.eventVenue || 'Locale (opzionale)'}</label>
                    <select value={eventForm.venueId} onChange={e => setEventForm({ ...eventForm, venueId: e.target.value })}>
                      <option value="">{t.noVenue || '— Nessun locale —'}</option>
                      {venues.map(v => (
                        <option key={v.id} value={v.id}>{v.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>{t.eventImage}</label>
                    <input type="text" value={eventForm.imageId} onChange={e => setEventForm({ ...eventForm, imageId: e.target.value })} placeholder="Cloudinary ID" />
                  </div>
                  <div className="form-group">
                    <label>{t.eventLink} *</label>
                    <input type="text" value={eventForm.externalLink} onChange={e => setEventForm({ ...eventForm, externalLink: e.target.value })} placeholder="https://..." required />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn">{t.save}</button>
                    <button type="button" onClick={() => { setShowEventForm(false); setEditingEvent(null); setEventForm({ title: '', date: '', extraDates: [], location: '', description: '', imageId: '', externalLink: '', venueId: '' }) }} className="cancel-btn">{t.cancel}</button>
                  </div>
                </form>
              </div>
            )}

            <div className="admin-events-list">
              <h2>{t.adminTabEvents} ({events.length})</h2>
              <div className="events-grid">
                {events.map(event => (
                  <div key={event.id} className="admin-event-card">
                    {event.imageId && (
                      <div className="admin-event-image">
                        <img src={`https://res.cloudinary.com/dk99zyawv/image/upload/w_300,h_200,c_fill,q_auto/${event.imageId}`} alt={event.title} />
                      </div>
                    )}
                    <div className="admin-event-content">
                      <h3>{event.title}</h3>
                      <p><strong>Date:</strong> {formatDate(event.date)}</p>
                      {event.location && <p><strong>{t.eventLocation}:</strong> {event.location}</p>}
                      {event.externalLink && (
                        <a href={event.externalLink} target="_blank" rel="noopener noreferrer" className="event-link">View →</a>
                      )}
                      <div className="admin-event-actions">
                        <button onClick={() => handleEditEvent(event)} className="edit-btn">{t.editEvent}</button>
                        <button onClick={() => handleDeleteEvent(event.id)} className="delete-btn">{t.deleteEvent}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* —— CAMERE (STAY) —— */}
        {activeTab === 'rooms' && (
          <>
            <div className="admin-actions">
              <button
                onClick={() => {
                  setShowRoomForm(!showRoomForm)
                  setEditingRoom(null)
                  setRoomForm({ name: '', location: '', rating: '4', price: '', features: '', imageId: '', externalLink: '' })
                }}
                className="add-event-btn"
              >
                {showRoomForm ? t.cancel : t.addRoom}
              </button>
            </div>

            {showRoomForm && (
              <div className="admin-form-container">
                <h2>{editingRoom ? t.editRoom : t.addRoom}</h2>
                <form onSubmit={handleRoomSubmit} className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.roomName} *</label>
                      <input type="text" value={roomForm.name} onChange={e => setRoomForm({ ...roomForm, name: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>{t.roomLocation}</label>
                      <input type="text" value={roomForm.location} onChange={e => setRoomForm({ ...roomForm, location: e.target.value })} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.roomRating}</label>
                      <select value={roomForm.rating} onChange={e => setRoomForm({ ...roomForm, rating: e.target.value })}>
                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{t.roomPrice}</label>
                      <input type="text" value={roomForm.price} onChange={e => setRoomForm({ ...roomForm, price: e.target.value })} placeholder="€120/night" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.roomFeatures}</label>
                    <input type="text" value={roomForm.features} onChange={e => setRoomForm({ ...roomForm, features: e.target.value })} placeholder="Pool, Spa, WiFi" />
                  </div>
                  <div className="form-group">
                    <label>{t.roomImage}</label>
                    <input type="text" value={roomForm.imageId} onChange={e => setRoomForm({ ...roomForm, imageId: e.target.value })} placeholder="Cloudinary ID" />
                  </div>
                  <div className="form-group">
                    <label>{t.roomLink}</label>
                    <input type="url" value={roomForm.externalLink} onChange={e => setRoomForm({ ...roomForm, externalLink: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn">{t.save}</button>
                    <button type="button" onClick={() => { setShowRoomForm(false); setEditingRoom(null) }} className="cancel-btn">{t.cancel}</button>
                  </div>
                </form>
              </div>
            )}

            <div className="admin-events-list">
              <h2>{t.adminTabRooms} ({rooms.length})</h2>
              <div className="events-grid">
                {rooms.map(room => (
                  <div key={room.id} className="admin-event-card">
                    {room.imageId && (
                      <div className="admin-event-image">
                        <img src={`https://res.cloudinary.com/dk99zyawv/image/upload/w_300,h_200,c_fill,q_auto/${room.imageId}`} alt={room.name} />
                      </div>
                    )}
                    <div className="admin-event-content">
                      <h3>{room.name}</h3>
                      {room.location && <p><strong>{t.roomLocation}:</strong> {room.location}</p>}
                      {room.rating && <p><strong>{t.roomRating}:</strong> {room.rating} ★</p>}
                      {room.price && <p><strong>{t.roomPrice}:</strong> {room.price}</p>}
                      {Array.isArray(room.features) && room.features.length > 0 && (
                        <p><strong>{t.roomFeatures}:</strong> {room.features.join(', ')}</p>
                      )}
                      {room.externalLink && (
                        <a href={room.externalLink} target="_blank" rel="noopener noreferrer" className="event-link">Booking →</a>
                      )}
                      <div className="admin-event-actions">
                        <button onClick={() => handleEditRoom(room)} className="edit-btn">{t.editRoom}</button>
                        <button onClick={() => handleDeleteRoom(room.id)} className="delete-btn">{t.deleteRoom}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* —— LOCALI —— */}
        {activeTab === 'venues' && (
          <>
            <div className="admin-actions">
              <button
                onClick={() => {
                  setShowVenueForm(!showVenueForm)
                  setEditingVenue(null)
                  setVenueForm({ name: '', address: '' })
                }}
                className="add-event-btn"
              >
                {showVenueForm ? t.cancel : (t.addVenue || 'Aggiungi Locale')}
              </button>
            </div>

            {showVenueForm && (
              <div className="admin-form-container">
                <h2>{editingVenue ? (t.editVenue || 'Modifica Locale') : (t.addVenue || 'Aggiungi Locale')}</h2>
                <form onSubmit={handleVenueSubmit} className="admin-form">
                  <div className="form-group">
                    <label>{t.venueName || 'Nome locale'} *</label>
                    <input type="text" value={venueForm.name} onChange={e => setVenueForm({ ...venueForm, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label>{t.venueAddress || 'Indirizzo'}</label>
                    <input type="text" value={venueForm.address} onChange={e => setVenueForm({ ...venueForm, address: e.target.value })} />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn">{t.save}</button>
                    <button type="button" onClick={() => { setShowVenueForm(false); setEditingVenue(null) }} className="cancel-btn">{t.cancel}</button>
                  </div>
                </form>
              </div>
            )}

            <div className="admin-events-list">
              <h2>{t.adminTabVenues || 'Locali'} ({venues.length})</h2>
              {venues.length === 0 ? (
                <p className="admin-no-messages">{t.noVenues || 'Nessun locale creato.'}</p>
              ) : (
                <div className="venues-list">
                  {venues.map(venue => {
                    const venueEvents = events.filter(e => e.venueId === venue.id)
                    return (
                      <div key={venue.id} className="admin-venue-card">
                        <div className="admin-venue-header">
                          <div>
                            <h3 className="admin-venue-name">{venue.name}</h3>
                            {venue.address && <p className="admin-venue-address">{venue.address}</p>}
                            <span className="admin-venue-count">{venueEvents.length} {venueEvents.length === 1 ? 'evento' : 'eventi'}</span>
                          </div>
                          <div className="admin-event-actions">
                            <button onClick={() => handleEditVenue(venue)} className="edit-btn">{t.editEvent ? t.editVenue || 'Modifica' : 'Modifica'}</button>
                            <button onClick={() => handleDeleteVenue(venue.id)} className="delete-btn">{t.deleteEvent ? t.deleteVenue || 'Elimina' : 'Elimina'}</button>
                          </div>
                        </div>
                        {venueEvents.length > 0 && (
                          <ul className="admin-venue-events">
                            {venueEvents.map(ev => (
                              <li key={ev.id}>
                                <span className="admin-venue-event-title">{ev.title}</span>
                                <span className="admin-venue-event-date">{formatDate(ev.date)}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* —— ESPERIENZE —— */}
        {activeTab === 'experiences' && (
          <>
            <div className="admin-actions">
              <button
                onClick={() => {
                  setShowExpForm(!showExpForm)
                  setEditingExp(null)
                  setExpForm({ title: '', category: '', description: '', price: '', imageId: '', externalLink: '' })
                }}
                className="add-event-btn"
              >
                {showExpForm ? t.cancel : (t.addExperience || 'Aggiungi Esperienza')}
              </button>
            </div>

            {showExpForm && (
              <div className="admin-form-container">
                <h2>{editingExp ? (t.editExperience || 'Modifica Esperienza') : (t.addExperience || 'Aggiungi Esperienza')}</h2>
                <form onSubmit={handleExpSubmit} className="admin-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.eventTitle || 'Titolo'} *</label>
                      <input type="text" value={expForm.title} onChange={e => setExpForm({ ...expForm, title: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>{t.expCategory || 'Categoria (es. Boat Party)'}</label>
                      <input type="text" value={expForm.category} onChange={e => setExpForm({ ...expForm, category: e.target.value })} placeholder="Boat Party, Festival, Beach Party..." />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.eventDescription || 'Descrizione'}</label>
                    <textarea value={expForm.description} onChange={e => setExpForm({ ...expForm, description: e.target.value })} rows="4" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>{t.expPrice || 'Prezzo (es. €35)'}</label>
                      <input type="text" value={expForm.price} onChange={e => setExpForm({ ...expForm, price: e.target.value })} placeholder="€35" />
                    </div>
                    <div className="form-group">
                      <label>{t.eventImage || 'Immagine (Cloudinary ID)'}</label>
                      <input type="text" value={expForm.imageId} onChange={e => setExpForm({ ...expForm, imageId: e.target.value })} placeholder="Cloudinary ID" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t.eventLink || 'Link esterno'}</label>
                    <input type="url" value={expForm.externalLink} onChange={e => setExpForm({ ...expForm, externalLink: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn">{t.save}</button>
                    <button type="button" onClick={() => { setShowExpForm(false); setEditingExp(null) }} className="cancel-btn">{t.cancel}</button>
                  </div>
                </form>
              </div>
            )}

            <div className="admin-events-list">
              <h2>{t.experiences || 'Esperienze'} ({expList.length})</h2>
              <div className="events-grid">
                {expList.map(exp => (
                  <div key={exp.id} className="admin-event-card">
                    {exp.imageId && (
                      <div className="admin-event-image">
                        <img src={`https://res.cloudinary.com/dk99zyawv/image/upload/w_300,h_200,c_fill,q_auto/${exp.imageId}`} alt={exp.title} />
                      </div>
                    )}
                    <div className="admin-event-content">
                      <h3>{exp.title}</h3>
                      {exp.category && <p><strong>Categoria:</strong> {exp.category}</p>}
                      {exp.price && <p><strong>Prezzo:</strong> {exp.price}</p>}
                      {exp.externalLink && (
                        <a href={exp.externalLink} target="_blank" rel="noopener noreferrer" className="event-link">View →</a>
                      )}
                      <div className="admin-event-actions">
                        <button onClick={() => handleEditExp(exp)} className="edit-btn">{t.editEvent || 'Modifica'}</button>
                        <button onClick={() => handleDeleteExp(exp.id)} className="delete-btn">{t.deleteEvent || 'Elimina'}</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* —— MESSAGGI CONTATTI —— */}
        {activeTab === 'messages' && (
          <div className="admin-messages-section">
            <h2>{t.messagesFromContact} ({messages.length})</h2>
            {messagesError && <p className="admin-messages-error" role="alert">{messagesError}</p>}
            {messages.length === 0 && !messagesError ? (
              <p className="admin-no-messages">{t.noMessages}</p>
            ) : (
              <div className="admin-messages-list">
                {messages.map(msg => (
                  <div key={msg.id} className="admin-message-card">
                    <div className="admin-message-meta">
                      <strong>{msg.name || '—'}</strong>
                      <span className="admin-message-email">{msg.email || '—'}</span>
                      {msg.phone && <span className="admin-message-phone">{msg.phone}</span>}
                      <span className="admin-message-date">{t.receivedAt}: {formatDate(msg.createdAt)}</span>
                    </div>
                    <div className="admin-message-body">{msg.message || '—'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
