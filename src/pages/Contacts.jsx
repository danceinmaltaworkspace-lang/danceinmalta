import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './Pages.css'
import './Contacts.css'

const Contacts = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setSubmitError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setSubmitError(null)
    try {
      await addDoc(collection(db, 'contactMessages'), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: (formData.phone || '').trim(),
        message: formData.message.trim(),
        createdAt: serverTimestamp()
      })
      setFormData({ name: '', email: '', phone: '', message: '' })
      setSubmitSuccess(true)
      setSubmitError(null)
      setTimeout(() => setSubmitSuccess(false), 6000)
    } catch (err) {
      console.error('Errore invio messaggio:', err)
      setSubmitError(t.submitError)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="page-container page-animate contacts-page">
      <div className="page-header contacts-header">
        <div className="contacts-header-inner">
          <h1>{t.contactTitle}</h1>
          <p>{t.contactSubtitle}</p>
        </div>
      </div>

      <div className="contacts-main">
        <div className="container contacts-container">
          <div className="contacts-grid">
            <aside className="contacts-sidebar">
              <h2 className="contacts-sidebar-title">{t.contactInfoTitle}</h2>
              <div className="contacts-cards">
                <a href="https://www.google.com/maps/search/St+Georges+Business+Complex+Elija+Zammit+Street+St+Julian's+Malta" target="_blank" rel="noopener noreferrer" className="contact-card contact-card-address">
                  <span className="contact-card-icon" aria-hidden>📍</span>
                  <div className="contact-card-content">
                    <span className="contact-card-label">{t.addressLabel}</span>
                    <span className="contact-card-value">St Georges Business Complex<br />4th Floor, Elija Zammit Street<br />St Julian's STJ 3150, Malta</span>
                  </div>
                </a>
                <a href="tel:+35699027173" className="contact-card">
                  <span className="contact-card-icon" aria-hidden>📞</span>
                  <div className="contact-card-content">
                    <span className="contact-card-label">{language === 'IT' ? 'Telefono' : language === 'ES' ? 'Teléfono' : language === 'FR' ? 'Téléphone' : 'Phone'}</span>
                    <span className="contact-card-value">+356 9902 7173</span>
                  </div>
                </a>
                <a href="mailto:infodanceinmalta@gmail.com" className="contact-card">
                  <span className="contact-card-icon" aria-hidden>✉️</span>
                  <div className="contact-card-content">
                    <span className="contact-card-label">Email</span>
                    <span className="contact-card-value">infodanceinmalta@gmail.com</span>
                  </div>
                </a>
                <a href="https://wa.me/35699027173" className="contact-card contact-card-whatsapp" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-icon" aria-hidden>💬</span>
                  <div className="contact-card-content">
                    <span className="contact-card-label">WhatsApp</span>
                    <span className="contact-card-value">{t.whatsappCta}</span>
                  </div>
                </a>
              </div>

              <div className="contacts-social-heading">{t.followUs || 'Seguici sui social'}</div>
              <div className="contacts-social-cards">
                <a
                  href="https://www.instagram.com/danceinmalta?igsh=b3U3OHQ0Zno4d3do"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-card contact-social-instagram"
                >
                  <span className="contact-social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </span>
                  <div className="contact-social-info">
                    <span className="contact-social-name">Instagram</span>
                    <span className="contact-social-handle">@danceinmalta</span>
                  </div>
                  <span className="contact-social-arrow">↗</span>
                </a>
                <a
                  href="https://www.tiktok.com/@dance_in_malta?_r=1&_t=ZN-941eUj4RPct"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-card contact-social-tiktok"
                >
                  <span className="contact-social-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/></svg>
                  </span>
                  <div className="contact-social-info">
                    <span className="contact-social-name">TikTok</span>
                    <span className="contact-social-handle">@dance_in_malta</span>
                  </div>
                  <span className="contact-social-arrow">↗</span>
                </a>
              </div>
            </aside>

            <section className="contacts-form-section">
              <div className="contacts-form-card">
                <h2 className="contacts-form-title">{t.formTitle}</h2>
                <form className="contact-form contact-form-modern" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">{t.name} *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">{t.email} *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t.phone}</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">{t.message} *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      required
                    />
                  </div>
                  {submitSuccess && <div className="contact-form-success" role="status">{t.submitSuccess}</div>}
                  {submitError && <p className="contact-form-error" role="alert">{submitError}</p>}
                  <button type="submit" className="contact-submit-btn" disabled={sending}>
                    {sending ? t.sending : t.sendMessage}
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts
