import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './WhyUs.css'

/* ── Flat vector illustrations ── */
const IllustrationExperience = () => (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-illustration">
    <circle cx="60" cy="45" r="28" fill="#ede9fe" />
    {/* Clock */}
    <circle cx="60" cy="45" r="22" stroke="#7c3aed" strokeWidth="2.5" fill="white"/>
    <path d="M60 30v15l9 6" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Stars */}
    <path d="M22 20l2 4 4.5 1-3.2 3 .8 4.5L22 30.5 17.9 32.5l.8-4.5L15.5 25l4.5-1z" fill="#a78bfa"/>
    <path d="M96 62l1.5 3 3.5.7-2.5 2.3.6 3.5-3.1-1.5-3.1 1.5.6-3.5-2.5-2.3 3.5-.7z" fill="#c4b5fd"/>
    {/* Trophy */}
    <rect x="53" y="74" width="14" height="4" rx="1.5" fill="#7c3aed"/>
    <rect x="56" y="78" width="8" height="3" rx="1" fill="#a78bfa"/>
  </svg>
)

const IllustrationAudience = () => (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-illustration">
    <ellipse cx="60" cy="85" rx="38" ry="8" fill="#ede9fe" opacity="0.5"/>
    {/* Person left */}
    <circle cx="34" cy="42" r="11" fill="#c4b5fd"/>
    <path d="M16 80c0-10 8-18 18-18s18 8 18 18" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.5"/>
    {/* Person center (bigger) */}
    <circle cx="60" cy="38" r="14" fill="#7c3aed"/>
    <path d="M38 82c0-12 10-22 22-22s22 10 22 22" fill="#a78bfa" stroke="#7c3aed" strokeWidth="1.5"/>
    {/* Person right */}
    <circle cx="86" cy="42" r="11" fill="#c4b5fd"/>
    <path d="M68 80c0-10 8-18 18-18s18 8 18 18" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.5"/>
    {/* Flags */}
    <rect x="52" y="14" width="3" height="18" rx="1" fill="#7c3aed"/>
    <path d="M55 14l10 4-10 4z" fill="#f59e0b"/>
  </svg>
)

const IllustrationLanguages = () => (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-illustration">
    <circle cx="60" cy="48" r="30" fill="#ede9fe"/>
    {/* Speech bubble 1 */}
    <rect x="18" y="22" width="38" height="24" rx="8" fill="#7c3aed"/>
    <path d="M30 46l-6 6 8-2z" fill="#7c3aed"/>
    <text x="24" y="38" fontSize="10" fontWeight="bold" fill="white" fontFamily="Inter,sans-serif">IT  EN</text>
    {/* Speech bubble 2 */}
    <rect x="64" y="40" width="38" height="24" rx="8" fill="#a78bfa"/>
    <path d="M90 64l6 6-8-2z" fill="#a78bfa"/>
    <text x="70" y="56" fontSize="10" fontWeight="bold" fill="white" fontFamily="Inter,sans-serif">ES  FR</text>
    {/* Globe */}
    <circle cx="60" cy="75" r="10" stroke="#7c3aed" strokeWidth="2" fill="white"/>
    <ellipse cx="60" cy="75" rx="4.5" ry="10" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
    <path d="M50 75h20" stroke="#7c3aed" strokeWidth="1.5"/>
  </svg>
)

const IllustrationEvents = () => (
  <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="why-illustration">
    <rect x="20" y="30" width="80" height="58" rx="10" fill="#ede9fe"/>
    {/* Calendar header */}
    <rect x="20" y="30" width="80" height="22" rx="10" fill="#7c3aed"/>
    <rect x="20" y="44" width="80" height="8" fill="#7c3aed"/>
    {/* Rings */}
    <rect x="38" y="22" width="5" height="18" rx="2.5" fill="#7c3aed"/>
    <rect x="77" y="22" width="5" height="18" rx="2.5" fill="#7c3aed"/>
    {/* Days */}
    <rect x="28" y="58" width="8" height="8" rx="2" fill="#7c3aed"/>
    <rect x="42" y="58" width="8" height="8" rx="2" fill="#c4b5fd"/>
    <rect x="56" y="58" width="8" height="8" rx="2" fill="#c4b5fd"/>
    <rect x="70" y="58" width="8" height="8" rx="2" fill="#c4b5fd"/>
    <rect x="84" y="58" width="8" height="8" rx="2" fill="#f59e0b"/>
    <rect x="28" y="72" width="8" height="8" rx="2" fill="#c4b5fd"/>
    <rect x="42" y="72" width="8" height="8" rx="2" fill="#7c3aed"/>
    <rect x="56" y="72" width="8" height="8" rx="2" fill="#c4b5fd"/>
    <rect x="70" y="72" width="8" height="8" rx="2" fill="#f59e0b"/>
  </svg>
)

const illustrations = {
  experience: <IllustrationExperience />,
  audience:   <IllustrationAudience />,
  multilingual: <IllustrationLanguages />,
  events:     <IllustrationEvents />,
}

const WhyUs = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const cardsRef = useRef([])

  const features = [
    { id: 1, icon: 'experience',   number: '10+',  titleKey: 'whyYears',     descKey: 'whyYearsDesc' },
    { id: 2, icon: 'audience',     number: '50K+', titleKey: 'whyAudience',  descKey: 'whyAudienceDesc' },
    { id: 3, icon: 'multilingual', number: '4',    titleKey: 'whyLanguages', descKey: 'whyLanguagesDesc' },
    { id: 4, icon: 'events',       number: '100+', titleKey: 'whyEvents',    descKey: 'whyEventsDesc' },
  ]

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
              <div className="why-card-illus">
                {illustrations[feature.icon]}
              </div>
              <div className="why-card-body">
                <div className="why-card-number">{feature.number}</div>
                <h3 className="why-card-title">{t[feature.titleKey]}</h3>
                <p className="why-card-desc">{t[feature.descKey]}</p>
              </div>
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
