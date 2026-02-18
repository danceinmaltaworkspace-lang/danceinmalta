import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './WhatWeDo.css'

/* ────────────────────────────────────────────
   Character illustrations — flat design style
   (ispirate alla reference Ski&Night)
──────────────────────────────────────────── */

const IllustrationBoatParty = () => (
  <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Sea */}
    <path d="M10 120 Q30 112 50 120 Q70 128 90 120 Q110 112 130 120 Q150 128 170 120 L170 150 L10 150z" fill="#bfdbfe"/>
    <path d="M10 130 Q35 122 60 130 Q85 138 110 130 Q135 122 160 130 L170 150 L10 150z" fill="#93c5fd"/>
    {/* Boat hull */}
    <path d="M40 115 L140 115 L125 130 L55 130z" fill="#1e40af"/>
    <rect x="60" y="85" width="60" height="32" rx="4" fill="#2563eb"/>
    {/* Sail / flag */}
    <rect x="87" y="35" width="3" height="52" fill="#1e3a8a"/>
    <path d="M90 35 L130 55 L90 75z" fill="white"/>
    <path d="M90 35 L90 75 L50 55z" fill="#dbeafe"/>
    {/* Person 1 on deck */}
    <circle cx="72" cy="82" r="9" fill="#fde68a"/>
    <rect x="65" y="92" width="14" height="18" rx="5" fill="#f97316"/>
    <path d="M65 98 Q58 96 56 102" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
    <path d="M79 98 Q86 96 88 102" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
    {/* Person 2 on deck */}
    <circle cx="108" cy="82" r="9" fill="#fed7aa"/>
    <rect x="101" y="92" width="14" height="18" rx="5" fill="#8b5cf6"/>
    <path d="M101 98 Q94 96 92 102" stroke="#8b5cf6" strokeWidth="5" strokeLinecap="round"/>
    <path d="M115 98 Q122 96 124 102" stroke="#8b5cf6" strokeWidth="5" strokeLinecap="round"/>
    {/* Sun */}
    <circle cx="155" cy="28" r="14" fill="#fbbf24"/>
    <path d="M155 8v6M155 42v6M135 28h-6M181 28h-6M141 14l4 4M165 38l4 4M141 42l4-4M165 18l4-4" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Music notes */}
    <path d="M30 60 Q36 54 42 58" stroke="#6366f1" strokeWidth="2" fill="none"/>
    <circle cx="28" cy="62" r="3.5" fill="#6366f1"/>
    <rect x="31.5" y="52" width="2" height="10" fill="#6366f1"/>
    {/* Seagull */}
    <path d="M20 50 Q24 46 28 50" stroke="#64748b" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M32 46 Q36 42 40 46" stroke="#64748b" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
)

const IllustrationFestival = () => (
  <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Stage floor */}
    <rect x="20" y="120" width="140" height="20" rx="4" fill="#e9d5ff"/>
    <rect x="30" y="100" width="120" height="22" rx="3" fill="#f3e8ff"/>
    {/* Stage lights */}
    <path d="M50 30 L35 100 L65 100z" fill="#fef08a" opacity=".5"/>
    <path d="M90 25 L75 100 L105 100z" fill="#bfdbfe" opacity=".5"/>
    <path d="M130 30 L115 100 L145 100z" fill="#fca5a5" opacity=".45"/>
    <circle cx="50" cy="26" r="8" fill="#fbbf24"/>
    <circle cx="90" cy="21" r="8" fill="#60a5fa"/>
    <circle cx="130" cy="26" r="8" fill="#f87171"/>
    {/* Person center – singer */}
    <circle cx="90" cy="75" r="13" fill="#fde68a"/>
    <ellipse cx="84" cy="73" rx="2" ry="2.5" fill="#92400e"/>
    <ellipse cx="96" cy="73" rx="2" ry="2.5" fill="#92400e"/>
    <path d="M84 80 Q90 85 96 80" stroke="#92400e" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <rect x="82" y="89" width="16" height="22" rx="6" fill="#7c3aed"/>
    <rect x="84" y="109" width="6" height="12" rx="3" fill="#5b21b6"/>
    <rect x="90" y="109" width="6" height="12" rx="3" fill="#5b21b6"/>
    {/* Mic */}
    <rect x="87" y="84" width="6" height="10" rx="3" fill="#374151"/>
    <circle cx="90" cy="83" r="4" fill="#6b7280"/>
    {/* Arms up */}
    <path d="M82 93 Q70 85 62 78" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round"/>
    <path d="M98 93 Q110 85 118 78" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round"/>
    <circle cx="60" cy="76" r="5" fill="#fde68a"/>
    <circle cx="120" cy="76" r="5" fill="#fed7aa"/>
    {/* Crowd left */}
    <circle cx="45" cy="108" r="8" fill="#fed7aa"/>
    <rect x="38" y="117" width="14" height="16" rx="5" fill="#f97316"/>
    {/* Crowd right */}
    <circle cx="135" cy="108" r="8" fill="#fde68a"/>
    <rect x="128" y="117" width="14" height="16" rx="5" fill="#3b82f6"/>
    {/* Confetti */}
    <rect x="25" y="42" width="6" height="6" rx="1" fill="#f59e0b" transform="rotate(25 25 42)"/>
    <rect x="148" y="50" width="6" height="6" rx="1" fill="#34d399" transform="rotate(-20 148 50)"/>
    <rect x="60" y="38" width="5" height="5" rx="1" fill="#f472b6" transform="rotate(15 60 38)"/>
    <rect x="120" y="35" width="5" height="5" rx="1" fill="#60a5fa" transform="rotate(-30 120 35)"/>
  </svg>
)

const IllustrationBeachParty = () => (
  <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Sky/sea gradient bg */}
    <rect x="0" y="0" width="180" height="90" fill="#e0f2fe" rx="8"/>
    {/* Sun */}
    <circle cx="150" cy="30" r="18" fill="#fbbf24"/>
    <path d="M150 6v8M150 46v8M126 30h-8M182 30h-8M134 14l5.5 5.5M160.5 40.5l5.5 5.5M134 46l5.5-5.5M160.5 19.5l5.5-5.5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/>
    {/* Sand */}
    <path d="M0 90 Q45 82 90 90 Q135 98 180 90 L180 150 L0 150z" fill="#fde68a"/>
    {/* Sea */}
    <path d="M0 88 Q22 82 44 88 Q66 94 88 88 Q110 82 132 88 Q154 94 180 88 L180 105 L0 105z" fill="#7dd3fc" opacity=".7"/>
    {/* Palm tree */}
    <rect x="28" y="60" width="6" height="50" rx="3" fill="#92400e"/>
    <path d="M31 62 Q14 48 8 35 Q22 38 28 52" fill="#22c55e"/>
    <path d="M31 62 Q50 46 58 34 Q44 40 32 54" fill="#16a34a"/>
    <path d="M31 62 Q24 40 30 28 Q36 40 34 56" fill="#15803d"/>
    {/* Person 1 dancing */}
    <circle cx="80" cy="88" r="11" fill="#fde68a"/>
    <ellipse cx="75" cy="86" rx="2" ry="2.5" fill="#92400e"/>
    <ellipse cx="85" cy="86" rx="2" ry="2.5" fill="#92400e"/>
    <path d="M75 93 Q80 97 85 93" stroke="#92400e" strokeWidth="1.5" fill="none"/>
    <rect x="72" y="100" width="16" height="20" rx="6" fill="#f97316"/>
    <path d="M72 106 Q62 100 58 108" stroke="#f97316" strokeWidth="6" strokeLinecap="round"/>
    <path d="M88 106 Q98 100 102 108" stroke="#f97316" strokeWidth="6" strokeLinecap="round"/>
    {/* Person 2 */}
    <circle cx="120" cy="90" r="10" fill="#fed7aa"/>
    <rect x="113" y="101" width="14" height="18" rx="5" fill="#a78bfa"/>
    <path d="M113 107 Q106 104 104 110" stroke="#a78bfa" strokeWidth="5" strokeLinecap="round"/>
    <path d="M127 107 Q134 104 136 110" stroke="#a78bfa" strokeWidth="5" strokeLinecap="round"/>
    {/* Cocktail */}
    <path d="M148 100 L155 120 L141 120z" fill="#fcd34d" opacity=".7"/>
    <rect x="152" y="120" width="3" height="12" rx="1" fill="#d97706"/>
    <rect x="144" y="132" width="17" height="4" rx="2" fill="#f59e0b"/>
    <rect x="152" y="96" width="3" height="6" rx="1" fill="#6d28d9"/>
    <circle cx="153.5" cy="95" r="3" fill="#f9a8d4"/>
    {/* Music notes */}
    <path d="M50 72 Q56 66 62 70" stroke="#8b5cf6" strokeWidth="2" fill="none"/>
    <circle cx="48" cy="74" r="3" fill="#8b5cf6"/>
  </svg>
)

const IllustrationNightEvent = () => (
  <svg viewBox="0 0 180 150" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Dark ceiling/room */}
    <rect x="0" y="0" width="180" height="60" rx="8" fill="#1e1b4b"/>
    {/* Disco ball */}
    <circle cx="90" cy="20" r="16" fill="#c4b5fd"/>
    <circle cx="90" cy="20" r="16" fill="url(#disco)" opacity=".8"/>
    <defs>
      <radialGradient id="disco" cx="40%" cy="40%">
        <stop offset="0%" stopColor="white" stopOpacity=".9"/>
        <stop offset="100%" stopColor="#7c3aed" stopOpacity=".3"/>
      </radialGradient>
    </defs>
    {/* Disco reflections */}
    <circle cx="40" cy="55" r="5" fill="#fbbf24" opacity=".7"/>
    <circle cx="65" cy="48" r="4" fill="#f472b6" opacity=".7"/>
    <circle cx="115" cy="50" r="4" fill="#60a5fa" opacity=".7"/>
    <circle cx="140" cy="55" r="5" fill="#34d399" opacity=".7"/>
    <circle cx="20" cy="42" r="3" fill="#fb7185" opacity=".6"/>
    <circle cx="160" cy="42" r="3" fill="#fbbf24" opacity=".6"/>
    {/* Floor */}
    <rect x="0" y="60" width="180" height="90" fill="#2e1065" rx="0"/>
    <rect x="0" y="125" width="180" height="25" rx="0" fill="#1e1b4b"/>
    {/* Light beams */}
    <path d="M90 36 L50 130 L90 130z" fill="#fde68a" opacity=".06"/>
    <path d="M90 36 L130 130 L90 130z" fill="#c4b5fd" opacity=".06"/>
    {/* Person 1 – dancing left */}
    <circle cx="55" cy="85" r="12" fill="#fde68a"/>
    <ellipse cx="50" cy="83" rx="2" ry="2.5" fill="#92400e"/>
    <ellipse cx="60" cy="83" rx="2" ry="2.5" fill="#92400e"/>
    <path d="M50 90 Q55 95 60 90" stroke="#92400e" strokeWidth="1.5" fill="none"/>
    <rect x="47" y="98" width="16" height="22" rx="6" fill="#7c3aed"/>
    <rect x="49" y="118" width="6" height="12" rx="3" fill="#5b21b6"/>
    <rect x="58" y="118" width="6" height="12" rx="3" fill="#5b21b6"/>
    <path d="M47 104 Q36 98 33 106" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round"/>
    <path d="M63 104 Q74 98 77 106" stroke="#7c3aed" strokeWidth="6" strokeLinecap="round"/>
    {/* Person 2 – dancing right */}
    <circle cx="125" cy="85" r="12" fill="#fed7aa"/>
    <ellipse cx="120" cy="83" rx="2" ry="2.5" fill="#92400e"/>
    <ellipse cx="130" cy="83" rx="2" ry="2.5" fill="#92400e"/>
    <path d="M120 90 Q125 95 130 90" stroke="#92400e" strokeWidth="1.5" fill="none"/>
    <rect x="117" y="98" width="16" height="22" rx="6" fill="#ec4899"/>
    <rect x="119" y="118" width="6" height="12" rx="3" fill="#be185d"/>
    <rect x="128" y="118" width="6" height="12" rx="3" fill="#be185d"/>
    <path d="M117 104 Q106 98 103 106" stroke="#ec4899" strokeWidth="6" strokeLinecap="round"/>
    <path d="M133 104 Q144 98 147 106" stroke="#ec4899" strokeWidth="6" strokeLinecap="round"/>
    {/* Music notes */}
    <path d="M100 75 Q106 69 112 73" stroke="#f472b6" strokeWidth="2" fill="none"/>
    <circle cx="98" cy="77" r="3.5" fill="#f472b6"/>
    <rect x="101.5" y="67" width="2" height="10" fill="#f472b6"/>
    <path d="M150 78 Q156 72 162 76" stroke="#a78bfa" strokeWidth="2" fill="none"/>
    <circle cx="148" cy="80" r="3" fill="#a78bfa"/>
    {/* Stars */}
    <circle cx="30" cy="20" r="2" fill="white" opacity=".8"/>
    <circle cx="50" cy="12" r="1.5" fill="white" opacity=".6"/>
    <circle cx="140" cy="16" r="2" fill="white" opacity=".8"/>
    <circle cx="165" cy="10" r="1.5" fill="white" opacity=".6"/>
  </svg>
)

const activities = [
  { id: 1, illus: <IllustrationBoatParty />,   tag: 'Boat Party',   titleKey: 'wwd1Title', descKey: 'wwd1Desc' },
  { id: 2, illus: <IllustrationFestival />,     tag: 'Festival',     titleKey: 'wwd2Title', descKey: 'wwd2Desc' },
  { id: 3, illus: <IllustrationBeachParty />,   tag: 'Beach Party',  titleKey: 'wwd3Title', descKey: 'wwd3Desc' },
  { id: 4, illus: <IllustrationNightEvent />,   tag: 'Night Event',  titleKey: 'wwd4Title', descKey: 'wwd4Desc' },
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
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              <div className="wwd-card-illus">
                {item.illus}
              </div>
              <div className="wwd-card-body">
                <span className="wwd-card-tag">{item.tag}</span>
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
