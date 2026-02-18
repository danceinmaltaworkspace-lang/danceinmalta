import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './WhyUs.css'

const features = [
  { id: 1, icon: '⏱', number: '10+',  titleKey: 'whyYears',     descKey: 'whyYearsDesc' },
  { id: 2, icon: '🌍', number: '50K+', titleKey: 'whyAudience',  descKey: 'whyAudienceDesc' },
  { id: 3, icon: '💬', number: '4',    titleKey: 'whyLanguages', descKey: 'whyLanguagesDesc' },
  { id: 4, icon: '🎉', number: '100+', titleKey: 'whyEvents',    descKey: 'whyEventsDesc' },
]

const WhyUs = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.12 }
    )
    cardsRef.current.forEach((card) => { if (card) observer.observe(card) })
    return () => observer.disconnect()
  }, [])

  return (
    <section className="why-us section">
      <div className="container">
        <span className="why-us-eyebrow">{t.whyUsEyebrow}</span>
        <h2 className="section-title why-us-title">{t.whyUs}</h2>
        <p className="why-us-subtitle">{t.whyUsSubtitle}</p>

        <div className="why-us-grid">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="why-card"
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ transitionDelay: `${index * 0.11}s` }}
            >
              <div className="why-card-icon">{feature.icon}</div>
              <div className="why-card-number">{feature.number}</div>
              <h3 className="why-card-title">{t[feature.titleKey]}</h3>
              <p className="why-card-desc">{t[feature.descKey]}</p>
            </div>
          ))}
        </div>

        <div className="why-us-cta">
          <a href="#contacts" className="why-us-btn">
            {t.contactUs}
            <span className="why-us-btn-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default WhyUs
