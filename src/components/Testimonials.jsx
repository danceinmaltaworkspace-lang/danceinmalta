import React from 'react'
import './Testimonials.css'

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      title: 'A point of reference',
      text: 'If you love organization, this is the right site! Exclusive events, international-level shows, and an easy-to-use interface. I will definitely buy more tickets.',
      rating: 5,
    },
    {
      id: 2,
      title: 'Fantastic experience!',
      text: 'I bought tickets for a festival through Dance in Malta and everything was perfect! The site is intuitive and easy to use. I highly recommend it!',
      rating: 5,
    },
    {
      id: 3,
      title: 'Well-organized packages',
      text: 'We chose a complete package with accommodation and events included, and we were super excited. Everything was organized down to the smallest details, and we had a unique experience without any stress.',
      rating: 5,
    },
  ]

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <span key={i} className="star">★</span>
    ))
  }

  return (
    <section className="testimonials section">
      <div className="container">
        <h2 className="section-title">They say about us...</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="testimonial-title">{testimonial.title}</h3>
              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
