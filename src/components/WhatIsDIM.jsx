import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './WhatIsDIM.css'

const WhatIsDIM = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="what-is-dim section">
      <div className="container">
        <div className="what-is-dim-content">
          <span className="what-is-dim-eyebrow">{t.whatIsDIMEyebrow}</span>
          <h2 className="what-is-dim-title">{t.whatIsDIM}</h2>
          <p className="what-is-dim-lead">{t.whatIsDIMText1}</p>
          <p className="what-is-dim-text">{t.whatIsDIMText2}</p>
        </div>
      </div>
    </section>
  )
}

export default WhatIsDIM
