import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './WhatWeDo.css'

const activities = [
  {
    id: 1,
    imageId: 'samples/landscapes/beach-boat',
    fallbackGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    titleKey: 'wwd1Title',
    descKey: 'wwd1Desc',
    tag: 'Boat Party',
  },
  {
    id: 2,
    imageId: 'samples/ecommerce/leather-bag-gray',
    fallbackGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    titleKey: 'wwd2Title',
    descKey: 'wwd2Desc',
    tag: 'Festival',
  },
  {
    id: 3,
    imageId: 'samples/landscapes/architecture-signs',
    fallbackGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    titleKey: 'wwd3Title',
    descKey: 'wwd3Desc',
    tag: 'Beach Party',
  },
  {
    id: 4,
    imageId: 'samples/food/dessert',
    fallbackGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    titleKey: 'wwd4Title',
    descKey: 'wwd4Desc',
    tag: 'Night Event',
  },
]

const CLOUD_BASE = 'https://res.cloudinary.com/dk99zyawv/image/upload'

const WhatWeDo = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const itemsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.12 }
    )
    itemsRef.current.forEach((el) => { if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="what-we-do section">
      <div className="container">
        <span className="wwd-eyebrow">{t.wwdEyebrow}</span>
        <h2 className="section-title wwd-title">{t.wwdTitle}</h2>
        <p className="wwd-subtitle">{t.wwdSubtitle}</p>

        <div className="wwd-grid">
          {activities.map((item, index) => (
            <div
              key={item.id}
              className="wwd-card"
              ref={(el) => (itemsRef.current[index] = el)}
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              <div className="wwd-card-image">
                <img
                  src={`${CLOUD_BASE}/w_600,h_400,c_fill,q_auto,f_auto/${item.imageId}`}
                  alt={t[item.titleKey]}
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentNode.style.background = item.fallbackGradient
                  }}
                />
                <div className="wwd-card-overlay" />
                <span className="wwd-card-tag">{item.tag}</span>
              </div>
              <div className="wwd-card-body">
                <h3 className="wwd-card-title">{t[item.titleKey]}</h3>
                <p className="wwd-card-desc">{t[item.descKey]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhatWeDo
