import React, { useState, useEffect } from 'react'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from '../components/CloudinaryImage'
import './Pages.css'

const Stay = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'rooms'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRooms(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsubscribe()
  }, [])

  const renderStars = (rating) => {
    const n = typeof rating === 'number' ? rating : 4
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < n ? 'star filled' : 'star'}>★</span>
    ))
  }

  return (
    <div className="page-container page-animate">
      <div className="page-header">
        <h1>{t.stayTitle}</h1>
        <p>{t.staySubtitle}</p>
      </div>
      <div className="container">
        {rooms.length === 0 ? (
          <p className="no-rooms-message" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-light)' }}>
            {language === 'IT' ? 'Nessun alloggio al momento.' : language === 'ES' ? 'No hay alojamientos por ahora.' : language === 'FR' ? 'Aucun hébergement pour le moment.' : 'No accommodations at the moment.'}
          </p>
        ) : (
          <div className="accommodations-grid">
            {rooms.map((room) => (
              <div key={room.id} className="accommodation-card">
                <div className="accommodation-image-placeholder">
                  {room.imageId ? (
                    <CloudinaryImage
                      imageId={room.imageId}
                      alt={room.name}
                      width={400}
                      height={225}
                      crop="fill"
                      className="accommodation-image-cloudinary"
                    />
                  ) : (
                    <span>{room.name}</span>
                  )}
                </div>
                <div className="accommodation-details">
                  <h3>{room.name}</h3>
                  {room.location && <p className="accommodation-location">📍 {room.location}</p>}
                  <div className="accommodation-rating">
                    {renderStars(room.rating)}
                  </div>
                  {Array.isArray(room.features) && room.features.length > 0 && (
                    <div className="accommodation-features">
                      {room.features.map((feature, index) => (
                        <span key={index} className="feature-tag">{feature}</span>
                      ))}
                    </div>
                  )}
                  {room.price && <div className="accommodation-price">{room.price}</div>}
                  {room.externalLink ? (
                    <a href={room.externalLink} target="_blank" rel="noopener noreferrer" className="accommodation-btn">
                      {language === 'IT' ? 'Prenota' : language === 'ES' ? 'Reservar' : language === 'FR' ? 'Réserver' : 'Book Now'}
                    </a>
                  ) : (
                    <button type="button" className="accommodation-btn" disabled>
                      {language === 'IT' ? 'Prenota' : language === 'ES' ? 'Reservar' : language === 'FR' ? 'Réserver' : 'Book Now'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Stay
