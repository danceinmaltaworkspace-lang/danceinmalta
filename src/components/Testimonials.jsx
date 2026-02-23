import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import './Testimonials.css'

const Testimonials = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const testimonials = [
    {
      id: 1,
      name: 'Giulia M.',
      title: 'A point of reference',
      text: 'If you love organization, this is the right site! Exclusive events, international-level shows, and an easy-to-use interface. I will definitely buy more tickets.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Carlos R.',
      title: 'Fantastic experience!',
      text: 'I bought tickets for a festival through Dance in Malta and everything was perfect! The site is intuitive and easy to use. I highly recommend it!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Sophie L.',
      title: 'Well-organized packages',
      text: 'We chose a complete package with accommodation and events included, and we were super excited. Everything was organized down to the smallest details, and we had a unique experience without any stress.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Marco T.',
      title: 'La migliore festa sull\'isola',
      text: 'Abbiamo prenotato la boat party tramite Dance in Malta e non siamo rimasti delusi. Tutto perfettamente organizzato, gente fantastica e una serata indimenticabile. Torneremo l\'estate prossima!',
      rating: 5,
    },
    {
      id: 5,
      name: 'Lucía G.',
      title: '¡Totalmente recomendable!',
      text: 'Gracias a Dance in Malta tuve acceso a los mejores eventos de la isla sin ningún problema. El equipo es muy atento y resuelve cualquier duda al momento. ¡Malta no sería lo mismo sin ellos!',
      rating: 5,
    },
    {
      id: 6,
      name: 'Antoine B.',
      title: 'Une soirée inoubliable',
      text: 'Nous avons réservé via Dance in Malta pour un festival en plein air et c\'était incroyable. Organisation impeccable, ambiance internationale et une île qui vaut vraiment le détour. Je recommande à 100 %.',
      rating: 4,
    },
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? 'star filled' : 'star empty'}>★</span>
    ))
  }

  return (
    <section className="testimonials section">
      <div className="container">
        <h2 className="section-title">{t.testimonialsTitle || 'What Travelers Say'}</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>
              <h3 className="testimonial-title">{testimonial.title}</h3>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <span className="testimonial-avatar">{testimonial.name.charAt(0)}</span>
                <span className="testimonial-name">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
