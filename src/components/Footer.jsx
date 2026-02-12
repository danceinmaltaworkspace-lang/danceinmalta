import React from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from './CloudinaryImage'
import './Footer.css'

const Footer = () => {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer id="contacts" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <Link to="/" className="footer-logo">
              <CloudinaryImage imageId="EA2908C3-608B-4D24-B6D2-E0741979C248-removebg-preview_euiz0q" alt="Dance in Malta" width={200} height={75} crop="fit" className="footer-logo-img" />
            </Link>
            <p className="footer-text">{t.footerTagline}</p>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">{t.contactInfo}</h4>
            <div className="footer-contact">
              <p>
                <strong>{language === 'IT' ? 'Indirizzo' : language === 'ES' ? 'Dirección' : language === 'FR' ? 'Adresse' : 'Address'}:</strong><br />
                St Georges Business Complex<br />
                4th Floor, Elija Zammit Street<br />
                St Julian's STJ 3150, Malta
              </p>
              <p>
                <strong>{language === 'IT' ? 'Telefono' : language === 'ES' ? 'Teléfono' : language === 'FR' ? 'Téléphone' : 'Phone'}:</strong><br />
                <a href="tel:+35699027173">+356 9902 7173</a>
              </p>
              <p>
                <strong>Email:</strong><br />
                <a href="mailto:info@danceinmalta.com">info@danceinmalta.com</a>
              </p>
              <p>
                <strong>WhatsApp:</strong><br />
                <a href="https://wa.me/35699027173" className="whatsapp-link" target="_blank" rel="noopener noreferrer">{t.whatsappCta}</a>
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">{t.quickLinks}</h4>
            <ul className="footer-links">
              <li><Link to="/events">{t.events}</Link></li>
              <li><Link to="/stay">{t.stay}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">{t.legal}</h4>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">{t.privacyPolicy}</Link></li>
              <li><Link to="/cookie-policy">{t.cookiePolicy}</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Dance in Malta. {t.allRightsReserved}</p>
          <p className="footer-powered">{t.poweredBy}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
