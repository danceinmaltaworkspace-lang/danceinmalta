import React, { useState, useEffect } from 'react'
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from '../components/CloudinaryImage'
import './Pages.css'
import './Experiences.css'

const Experiences = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [experiences, setExperiences] = useState([])

  useEffect(() => {
    const q = query(collection(db, 'experiences'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setExperiences(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsubscribe()
  }, [])

  return (
    <div className="page-container page-animate">
      <div className="page-header">
        <h1>{t.experiencesTitle}</h1>
        <p>{t.experiencesSubtitle}</p>
      </div>
      <div className="container">
        {experiences.length === 0 ? (
          <p className="experiences-empty">{t.noExperiences}</p>
        ) : (
          <div className="experiences-grid">
            {experiences.map((exp) => (
              <div key={exp.id} className="experience-card">
                <div className="experience-image">
                  {exp.imageId ? (
                    <CloudinaryImage
                      imageId={exp.imageId}
                      alt={exp.title}
                      width={600}
                      height={400}
                      crop="fill"
                    />
                  ) : (
                    <div className="experience-image-placeholder">
                      <span>{exp.title}</span>
                    </div>
                  )}
                  <div className="experience-overlay" />
                </div>
                <div className="experience-content">
                  {exp.category && (
                    <span className="experience-category">{exp.category}</span>
                  )}
                  <h3 className="experience-title">{exp.title}</h3>
                  {exp.description && (
                    <p className="experience-desc">{exp.description}</p>
                  )}
                  {exp.price && (
                    <span className="experience-price">{exp.price}</span>
                  )}
                  {exp.externalLink ? (
                    <a
                      href={exp.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="experience-btn"
                    >
                      {t.discoverExperience} →
                    </a>
                  ) : (
                    <button type="button" className="experience-btn" disabled>
                      {t.discoverExperience}
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

export default Experiences
