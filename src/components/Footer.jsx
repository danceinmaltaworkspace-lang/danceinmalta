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
              <CloudinaryImage imageId="Tavola-disegno-DANCE-IN-MALTA-1.png-removebg-preview_led1yu" alt="Dance in Malta" width={200} height={75} crop="fit" className="footer-logo-img" />
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

        <div className="footer-social">
          <a
            href="https://www.instagram.com/danceinmalta?igsh=b3U3OHQ0Zno4d3do"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="Instagram"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>Instagram</span>
          </a>
          <a
            href="https://www.tiktok.com/@dance_in_malta?_r=1&_t=ZN-941eUj4RPct"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/>
            </svg>
            <span>TikTok</span>
          </a>
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
