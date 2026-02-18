import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './WhatWeDo.css'

const activities = [
  {
    id: 1,
    titleKey: 'wwd1Title',
    descKey: 'wwd1Desc',
    tag: 'Boat Party',
    gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    accent: '#38bdf8',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 44 Q20 36 32 44 Q44 52 56 44" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M8 52 Q20 44 32 52 Q44 60 56 52" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity=".5"/>
        <path d="M18 42 L26 18 L44 42z" fill="white" opacity=".9"/>
        <path d="M26 18 L26 42" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 42 L50 42 L46 50 L18 50z" fill="white" opacity=".85"/>
        <circle cx="48" cy="14" r="8" fill="#fbbf24" opacity=".9"/>
        <path d="M48 4v4M48 20v4M38 14h-4M62 14h-4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity=".6"/>
      </svg>
    ),
  },
  {
    id: 2,
    titleKey: 'wwd2Title',
    descKey: 'wwd2Desc',
    tag: 'Festival',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #3b0764 50%, #581c87 100%)',
    accent: '#c084fc',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 6 L20 54 L32 48 L44 54z" fill="white" opacity=".15"/>
        <rect x="28" y="6" width="8" height="48" rx="2" fill="white" opacity=".08"/>
        <circle cx="18" cy="22" r="5" fill="#f472b6"/>
        <circle cx="46" cy="18" r="5" fill="#60a5fa"/>
        <circle cx="32" cy="14" r="5" fill="#fbbf24"/>
        <path d="M18 22 L32 44" stroke="#f472b6" strokeWidth="1.5" opacity=".5"/>
        <path d="M46 18 L32 44" stroke="#60a5fa" strokeWidth="1.5" opacity=".5"/>
        <path d="M32 14 L32 44" stroke="#fbbf24" strokeWidth="1.5" opacity=".5"/>
        <rect x="14" y="50" width="36" height="6" rx="2" fill="white" opacity=".2"/>
        <path d="M20 50 L44 50" stroke="white" strokeWidth="1" opacity=".3"/>
        <rect x="20" y="8" width="4" height="4" rx="1" fill="#c084fc" transform="rotate(15 20 8)"/>
        <rect x="42" y="30" width="4" height="4" rx="1" fill="#34d399" transform="rotate(-20 42 30)"/>
        <rect x="10" y="36" width="3" height="3" rx="1" fill="#f59e0b" transform="rotate(30 10 36)"/>
      </svg>
    ),
  },
  {
    id: 3,
    titleKey: 'wwd3Title',
    descKey: 'wwd3Desc',
    tag: 'Beach Party',
    gradient: 'linear-gradient(135deg, #012749 0%, #0c4a6e 50%, #0369a1 100%)',
    accent: '#34d399',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="20" r="10" fill="#fbbf24" opacity=".9"/>
        <path d="M32 6v4M32 30v4M18 20h-4M50 20h-4M22 10l-3-3M45 33l-3-3M22 30l-3 3M45 7l-3 3" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" opacity=".7"/>
        <path d="M8 52 Q16 44 24 48 Q32 52 40 48 Q48 44 56 48" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M8 58 Q16 50 24 54 Q32 58 40 54 Q48 50 56 54" stroke="#34d399" strokeWidth="2" strokeLinecap="round" opacity=".5"/>
        <rect x="28" y="36" width="3" height="18" rx="1.5" fill="white" opacity=".8"/>
        <path d="M31 36 Q44 42 38 50 Q31 46 31 36z" fill="white" opacity=".7"/>
        <path d="M12 40 Q18 28 14 20 Q22 24 18 36z" fill="#22c55e" opacity=".7"/>
        <path d="M12 40 Q6 28 10 20 Q18 24 14 36z" fill="#16a34a" opacity=".7"/>
      </svg>
    ),
  },
  {
    id: 4,
    titleKey: 'wwd4Title',
    descKey: 'wwd4Desc',
    tag: 'Night Event',
    gradient: 'linear-gradient(135deg, #0c0a1e 0%, #1e1b4b 50%, #312e81 100%)',
    accent: '#f472b6',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="14" r="8" fill="white" opacity=".15"/>
        <circle cx="32" cy="14" r="5" fill="white" opacity=".3"/>
        <circle cx="32" cy="14" r="2" fill="white" opacity=".9"/>
        <line x1="32" y1="22" x2="32" y2="56" stroke="white" strokeWidth="1.5" opacity=".3"/>
        <circle cx="14" cy="44" r="6" fill="#f472b6" opacity=".8"/>
        <circle cx="50" cy="40" r="6" fill="#818cf8" opacity=".8"/>
        <circle cx="22" cy="56" r="5" fill="#fbbf24" opacity=".7"/>
        <circle cx="42" cy="56" r="5" fill="#34d399" opacity=".7"/>
        <path d="M32 22 L14 44" stroke="white" strokeWidth="1" opacity=".2"/>
        <path d="M32 22 L50 40" stroke="white" strokeWidth="1" opacity=".2"/>
        <path d="M32 22 L22 56" stroke="white" strokeWidth="1" opacity=".15"/>
        <path d="M32 22 L42 56" stroke="white" strokeWidth="1" opacity=".15"/>
        <path d="M42 10 Q48 4 54 8" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity=".6"/>
        <circle cx="40" cy="12" r="2.5" fill="white" opacity=".6"/>
        <rect x="38" y="4" width="2" height="8" fill="white" opacity=".6"/>
      </svg>
    ),
  },
]

const WhatWeDo = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const cardsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }) },
      { threshold: 0.1 }
    )
    cardsRef.current.forEach((el) => { if (el) observer.observe(el) })
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
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="wwd-card-bg" style={{ background: item.gradient }} />
              <div className="wwd-card-glow" style={{ background: `radial-gradient(ellipse at 50% 0%, ${item.accent}33 0%, transparent 70%)` }} />

              <div className="wwd-card-inner">
                <div className="wwd-card-icon" style={{ color: item.accent, borderColor: `${item.accent}33`, background: `${item.accent}11` }}>
                  {item.icon}
                </div>
                <span className="wwd-card-tag" style={{ color: item.accent, borderColor: `${item.accent}44`, background: `${item.accent}18` }}>
                  {item.tag}
                </span>
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
