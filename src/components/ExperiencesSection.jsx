import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './ExperiencesSection.css'

const EXPERIENCE_CARDS = [
  {
    imageId: 'download_gmgrbi',
    labelKey: 'expPromoLabel1',
  },
  {
    imageId: 'download-1_bekbj6',
    labelKey: 'expPromoLabel2',
  },
  {
    imageId: 'download-2_i6qyo8',
    labelKey: 'expPromoLabel3',
  },
]

const getCloudinaryUrl = (imageId, w = 800, h = 600) =>
  `https://res.cloudinary.com/dk99zyawv/image/upload/w_${w},h_${h},c_fill,q_auto:best,f_auto/${imageId}`

const ExperiencesSection = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="exp-section section">
      <div className="container">
        <div className="exp-section-header">
          <span className="exp-section-eyebrow">{t.experiences}</span>
          <h2 className="section-title exp-section-title">{t.expPromoTitle}</h2>
          <p className="exp-section-subtitle">{t.expPromoSubtitle}</p>
        </div>

        <div className="exp-section-grid">
          {EXPERIENCE_CARDS.map((card, i) => (
            <Link to="/experiences" key={i} className="exp-section-card">
              <div className="exp-section-img-wrap">
                <img
                  src={getCloudinaryUrl(card.imageId)}
                  srcSet={`${getCloudinaryUrl(card.imageId, 800, 600)} 1x, ${getCloudinaryUrl(card.imageId, 1600, 1200)} 2x`}
                  alt={t[card.labelKey]}
                  className="exp-section-img"
                  loading="lazy"
                />
                <div className="exp-section-overlay" />
              </div>
              <div className="exp-section-card-label">
                <span>{t[card.labelKey]}</span>
                <span className="exp-section-card-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="exp-section-footer">
          <Link to="/experiences" className="exp-section-btn">
            {t.expPromoBtn}
            <span className="exp-section-btn-arrow" aria-hidden> →</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ExperiencesSection
