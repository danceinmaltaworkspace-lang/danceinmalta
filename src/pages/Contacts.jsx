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
                <a href="mailto:info@danceinmalta.com" className="contact-card">
                  <span className="contact-card-icon" aria-hidden>✉️</span>
                  <div className="contact-card-content">
                    <span className="contact-card-label">Email</span>
                    <span className="contact-card-value">info@danceinmalta.com</span>
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
