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
    title: '', date: '', location: '', description: '', imageId: '', externalLink: ''
  })

  // Rooms (Stay)
  const [rooms, setRooms] = useState([])
  const [showRoomForm, setShowRoomForm] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [roomForm, setRoomForm] = useState({
    name: '', location: '', rating: '4', price: '', features: '', imageId: '', externalLink: ''
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
      const payload = {
        ...eventForm,
        date: new Date(eventForm.date)
      }
      if (editingEvent) {
        await updateDoc(doc(db, 'events', editingEvent.id), payload)
      } else {
        await addDoc(collection(db, 'events'), { ...payload, createdAt: new Date() })
      }
      setEventForm({ title: '', date: '', location: '', description: '', imageId: '', externalLink: '' })
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
    setEventForm({
      title: event.title || '',
      date: d.toISOString().split('T')[0],
      location: event.location || '',
      description: event.description || '',
      imageId: event.imageId || '',
      externalLink: event.externalLink || ''
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
                  setEventForm({ title: '', date: '', location: '', description: '', imageId: '', externalLink: '' })
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
                      <label>{t.eventDate} *</label>
                      <input type="date" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} required />
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
                    <label>{t.eventImage}</label>
                    <input type="text" value={eventForm.imageId} onChange={e => setEventForm({ ...eventForm, imageId: e.target.value })} placeholder="Cloudinary ID" />
                  </div>
                  <div className="form-group">
                    <label>{t.eventLink} *</label>
                    <input type="url" value={eventForm.externalLink} onChange={e => setEventForm({ ...eventForm, externalLink: e.target.value })} placeholder="https://..." required />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="save-btn">{t.save}</button>
                    <button type="button" onClick={() => { setShowEventForm(false); setEditingEvent(null) }} className="cancel-btn">{t.cancel}</button>
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
