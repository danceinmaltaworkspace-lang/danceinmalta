import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './WhyUs.css'

/* ────────────────────────────────────────────────
   Character illustrations – flat design style
   (analogous to the Ski&Night reference)
──────────────────────────────────────────────── */

const IllustrationExperience = () => (
  <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Background circle */}
    <circle cx="80" cy="60" r="50" fill="#ede9fe" opacity=".7"/>
    {/* Person body */}
    <ellipse cx="80" cy="105" rx="22" ry="8" fill="#c4b5fd" opacity=".4"/>
    <rect x="68" y="78" width="24" height="32" rx="8" fill="#7c3aed"/>
    {/* Legs */}
    <rect x="70" y="106" width="8" height="14" rx="4" fill="#5b21b6"/>
    <rect x="82" y="106" width="8" height="14" rx="4" fill="#5b21b6"/>
    {/* Shoes */}
    <ellipse cx="74" cy="120" rx="6" ry="3" fill="#1e1b4b"/>
    <ellipse cx="86" cy="120" rx="6" ry="3" fill="#1e1b4b"/>
    {/* Arms */}
    <path d="M68 84 Q52 88 50 96" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round"/>
    <path d="M92 84 Q108 88 110 96" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round"/>
    {/* Hands */}
    <circle cx="49" cy="98" r="5" fill="#fde68a"/>
    <circle cx="111" cy="98" r="5" fill="#fde68a"/>
    {/* Head */}
    <circle cx="80" cy="66" r="16" fill="#fde68a"/>
    {/* Face */}
    <ellipse cx="75" cy="64" rx="2.5" ry="3" fill="#92400e"/>
    <ellipse cx="85" cy="64" rx="2.5" ry="3" fill="#92400e"/>
    <path d="M75 72 Q80 76 85 72" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Trophy held up */}
    <rect x="42" y="80" width="16" height="20" rx="3" fill="#f59e0b"/>
    <path d="M50 80 Q42 72 44 66 Q50 60 56 66 Q58 72 50 80" fill="#fbbf24"/>
    <rect x="46" y="100" width="8" height="4" rx="1.5" fill="#d97706"/>
    <rect x="43" y="104" width="14" height="3" rx="1.5" fill="#d97706"/>
    {/* Stars */}
    <path d="M120 28l2 5 5 1-3.5 3.5 1 5L120 40l-4.5 2.5 1-5L113 34l5-1z" fill="#a78bfa"/>
    <path d="M28 40l1.5 3.5 3.5.8-2.5 2.5.7 3.5-3.2-1.8-3.2 1.8.7-3.5-2.5-2.5 3.5-.8z" fill="#c4b5fd"/>
    <path d="M130 72l1 2.5 2.5.5-1.8 1.8.5 2.5-2.2-1.2-2.2 1.2.5-2.5-1.8-1.8 2.5-.5z" fill="#ddd6fe"/>
  </svg>
)

const IllustrationAudience = () => (
  <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="80" cy="60" r="50" fill="#ede9fe" opacity=".7"/>
    {/* Shadow */}
    <ellipse cx="80" cy="112" rx="45" ry="8" fill="#c4b5fd" opacity=".3"/>
    {/* Person left */}
    <circle cx="42" cy="55" r="12" fill="#fde68a"/>
    <rect x="32" y="68" width="20" height="26" rx="7" fill="#a78bfa"/>
    <rect x="34" y="92" width="7" height="12" rx="3.5" fill="#7c3aed"/>
    <rect x="43" y="92" width="7" height="12" rx="3.5" fill="#7c3aed"/>
    {/* Flag on a stick - left */}
    <rect x="54" y="44" width="2.5" height="20" rx="1" fill="#6d28d9"/>
    <path d="M56.5 44l10 4-10 4z" fill="#ef4444"/>
    {/* Person right */}
    <circle cx="118" cy="55" r="12" fill="#fed7aa"/>
    <rect x="108" y="68" width="20" height="26" rx="7" fill="#a78bfa"/>
    <rect x="110" y="92" width="7" height="12" rx="3.5" fill="#7c3aed"/>
    <rect x="119" y="92" width="7" height="12" rx="3.5" fill="#7c3aed"/>
    {/* Flag on a stick - right */}
    <rect x="103" y="44" width="2.5" height="20" rx="1" fill="#6d28d9"/>
    <path d="M103 44l-10 4 10 4z" fill="#3b82f6"/>
    {/* Person center (bigger) */}
    <circle cx="80" cy="48" r="16" fill="#fde68a"/>
    <ellipse cx="74" cy="46" rx="2.5" ry="3" fill="#92400e"/>
    <ellipse cx="86" cy="46" rx="2.5" ry="3" fill="#92400e"/>
    <path d="M74 54 Q80 59 86 54" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <rect x="66" y="65" width="28" height="30" rx="9" fill="#7c3aed"/>
    <rect x="68" y="93" width="9" height="14" rx="4.5" fill="#5b21b6"/>
    <rect x="83" y="93" width="9" height="14" rx="4.5" fill="#5b21b6"/>
    {/* Arms center */}
    <path d="M66 72 Q54 72 50 80" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round"/>
    <path d="M94 72 Q106 72 110 80" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round"/>
    {/* World map dots */}
    <circle cx="80" cy="20" r="3" fill="#a78bfa"/>
    <circle cx="90" cy="18" r="2" fill="#c4b5fd"/>
    <circle cx="70" cy="22" r="2" fill="#c4b5fd"/>
  </svg>
)

const IllustrationLanguages = () => (
  <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="80" cy="65" r="50" fill="#ede9fe" opacity=".7"/>
    {/* Person */}
    <ellipse cx="80" cy="115" rx="20" ry="7" fill="#c4b5fd" opacity=".4"/>
    <circle cx="80" cy="55" r="15" fill="#fde68a"/>
    <ellipse cx="74.5" cy="53" rx="2.5" ry="3" fill="#92400e"/>
    <ellipse cx="85.5" cy="53" rx="2.5" ry="3" fill="#92400e"/>
    <path d="M75 61 Q80 65 85 61" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <rect x="67" y="71" width="26" height="30" rx="8" fill="#7c3aed"/>
    <rect x="69" y="99" width="8" height="13" rx="4" fill="#5b21b6"/>
    <rect x="83" y="99" width="8" height="13" rx="4" fill="#5b21b6"/>
    {/* Arm pointing to bubble */}
    <path d="M67 78 Q52 75 46 68" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round"/>
    <circle cx="44" cy="66" r="5" fill="#fde68a"/>
    {/* Speech bubble 1 - IT */}
    <rect x="14" y="22" width="44" height="28" rx="8" fill="#7c3aed"/>
    <path d="M28 50l-6 8 12-4z" fill="#7c3aed"/>
    <text x="24" y="38" fontSize="11" fontWeight="800" fill="white" fontFamily="Inter,sans-serif">IT</text>
    <text x="38" y="38" fontSize="11" fontWeight="800" fill="#c4b5fd" fontFamily="Inter,sans-serif">EN</text>
    {/* Speech bubble 2 - ES/FR */}
    <rect x="102" y="22" width="44" height="28" rx="8" fill="#a78bfa"/>
    <path d="M132 50l6 8-12-4z" fill="#a78bfa"/>
    <text x="108" y="38" fontSize="11" fontWeight="800" fill="white" fontFamily="Inter,sans-serif">ES</text>
    <text x="124" y="38" fontSize="11" fontWeight="800" fill="#ede9fe" fontFamily="Inter,sans-serif">FR</text>
    {/* Globe */}
    <circle cx="80" cy="26" r="12" stroke="#7c3aed" strokeWidth="2" fill="white"/>
    <ellipse cx="80" cy="26" rx="5" ry="12" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
    <path d="M68 26h24" stroke="#7c3aed" strokeWidth="1.5"/>
    <path d="M70 19h20M70 33h20" stroke="#c4b5fd" strokeWidth="1" strokeDasharray="2 3"/>
  </svg>
)

const IllustrationEvents = () => (
  <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="80" cy="60" r="50" fill="#ede9fe" opacity=".7"/>
    {/* DJ desk */}
    <rect x="38" y="82" width="84" height="14" rx="5" fill="#5b21b6"/>
    <rect x="44" y="70" width="32" height="14" rx="4" fill="#7c3aed"/>
    <rect x="84" y="70" width="32" height="14" rx="4" fill="#7c3aed"/>
    {/* Turntable circles */}
    <circle cx="60" cy="77" r="8" fill="#a78bfa"/>
    <circle cx="60" cy="77" r="3" fill="#ede9fe"/>
    <circle cx="100" cy="77" r="8" fill="#a78bfa"/>
    <circle cx="100" cy="77" r="3" fill="#ede9fe"/>
    {/* Person/DJ */}
    <circle cx="80" cy="48" r="15" fill="#fde68a"/>
    <ellipse cx="74" cy="46" rx="2.5" ry="3" fill="#92400e"/>
    <ellipse cx="86" cy="46" rx="2.5" ry="3" fill="#92400e"/>
    <path d="M74 54 Q80 58 86 54" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    {/* Headphones */}
    <path d="M65 44 Q65 32 80 32 Q95 32 95 44" stroke="#5b21b6" strokeWidth="3" fill="none"/>
    <rect x="62" y="42" width="6" height="8" rx="3" fill="#5b21b6"/>
    <rect x="92" y="42" width="6" height="8" rx="3" fill="#5b21b6"/>
    {/* Body */}
    <rect x="68" y="64" width="24" height="20" rx="7" fill="#7c3aed"/>
    {/* Arms on deck */}
    <path d="M68 70 Q56 72 48 76" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round"/>
    <path d="M92 70 Q104 72 112 76" stroke="#7c3aed" strokeWidth="7" strokeLinecap="round"/>
    <circle cx="46" cy="77" r="5" fill="#fde68a"/>
    <circle cx="114" cy="77" r="5" fill="#fde68a"/>
    {/* Music notes */}
    <path d="M120 28 Q125 22 130 26" stroke="#a78bfa" strokeWidth="2" fill="none"/>
    <circle cx="118" cy="30" r="3" fill="#a78bfa"/>
    <rect x="121" y="20" width="2" height="10" fill="#a78bfa"/>
    <path d="M30 32 Q35 26 40 30" stroke="#c4b5fd" strokeWidth="2" fill="none"/>
    <circle cx="28" cy="34" r="3" fill="#c4b5fd"/>
    <rect x="31" y="24" width="2" height="10" fill="#c4b5fd"/>
    {/* Confetti */}
    <rect x="50" y="22" width="5" height="5" rx="1" fill="#f59e0b" transform="rotate(20 50 22)"/>
    <rect x="105" y="18" width="5" height="5" rx="1" fill="#34d399" transform="rotate(-15 105 18)"/>
    <rect x="130" y="44" width="4" height="4" rx="1" fill="#f87171" transform="rotate(30 130 44)"/>
    <rect x="25" y="50" width="4" height="4" rx="1" fill="#60a5fa" transform="rotate(-20 25 50)"/>
  </svg>
)

const illustrations = {
  experience:   <IllustrationExperience />,
  audience:     <IllustrationAudience />,
  multilingual: <IllustrationLanguages />,
  events:       <IllustrationEvents />,
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
