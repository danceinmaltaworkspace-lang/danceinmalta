import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './WhyUs.css'

const icons = {
  experience: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M24 14v10l6 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 36l3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 36l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  audience: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="18" r="5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <circle cx="32" cy="18" r="5" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M6 36c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M32 26c5.5 0 10 4.5 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  multilingual: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <ellipse cx="24" cy="24" rx="8" ry="18" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M6 24h36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M8 16h32M8 32h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 4"/>
    </svg>
  ),
  events: (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="14" width="32" height="26" rx="4" stroke="currentColor" strokeWidth="2.5" fill="none"/>
      <path d="M8 22h32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M16 8v8M32 8v8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M18 30h4l2-6 2 12 2-6h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const WhyUs = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const cardsRef = useRef([])

  const features = [
    { id: 1, icon: 'experience', number: '10+', titleKey: 'whyYears', descKey: 'whyYearsDesc' },
    { id: 2, icon: 'audience',   number: '50K+', titleKey: 'whyAudience', descKey: 'whyAudienceDesc' },
    { id: 3, icon: 'multilingual', number: '4',  titleKey: 'whyLanguages', descKey: 'whyLanguagesDesc' },
    { id: 4, icon: 'events',    number: '100+', titleKey: 'whyEvents', descKey: 'whyEventsDesc' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.15 }
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
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="why-card-glow" />
              <div className="why-card-icon">
                {icons[feature.icon]}
              </div>
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
