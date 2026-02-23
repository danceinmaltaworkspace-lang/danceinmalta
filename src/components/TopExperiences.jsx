import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, onSnapshot, orderBy, limit } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from './CloudinaryImage'
import './TopExperiences.css'

const LIMIT = 6

const TopExperiences = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'experiences'), orderBy('createdAt', 'desc'), limit(LIMIT))
    const unsubscribe = onSnapshot(q, (snap) => {
      setExperiences(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    })
    return () => unsubscribe()
  }, [])

  if (experiences.length === 0) return null

  return (
    <section className="top-experiences section">
      <div className="container">
        <div className="top-exp-header">
          <h2 className="section-title top-exp-title">{t.topExperiences}</h2>
          <p className="top-exp-subtitle">{t.topExperiencesSubtitle}</p>
        </div>

        <div className="top-exp-grid">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="top-exp-card"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="top-exp-image">
                {exp.imageId ? (
                  <CloudinaryImage
                    imageId={exp.imageId}
                    alt={exp.title}
                    width={600}
                    height={400}
                    crop="fill"
                  />
                ) : (
                  <div className="top-exp-placeholder">
                    <span>{exp.title}</span>
                  </div>
                )}
                <div className="top-exp-overlay" />
                {exp.category && (
                  <span className="top-exp-badge">{exp.category}</span>
                )}
              </div>
              <div className="top-exp-content">
                <h3 className="top-exp-name">{exp.title}</h3>
                {exp.description && (
                  <p className="top-exp-desc">{exp.description}</p>
                )}
                <div className="top-exp-footer">
                  {exp.price && <span className="top-exp-price">{exp.price}</span>}
                  {exp.externalLink ? (
                    <a
                      href={exp.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="top-exp-btn"
                    >
                      {t.discoverExperience} →
                    </a>
                  ) : (
                    <Link to="/experiences" className="top-exp-btn">
                      {t.discoverExperience} →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-footer">
          <Link to="/experiences" className="see-all-btn">{t.seeAll}</Link>
        </div>
      </div>
    </section>
  )
}

export default TopExperiences
