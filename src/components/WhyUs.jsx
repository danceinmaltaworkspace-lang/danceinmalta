import React from 'react'
import './WhyUs.css'

const WhyUs = () => {
  const features = [
    {
      id: 1,
      number: '10+',
      title: 'Years of experience',
    },
    {
      id: 2,
      number: '50K+',
      title: 'International audience',
    },
    {
      id: 3,
      number: '4',
      title: 'Multilingual support',
    },
    {
      id: 4,
      number: '100+',
      title: 'Many events available',
    },
  ]

  return (
    <section className="why-us section">
      <div className="container">
        <h2 className="section-title">Why us?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-number">{feature.number}</div>
              <h3 className="feature-title">{feature.title}</h3>
            </div>
          ))}
        </div>
        <div className="section-footer">
          <a href="#contacts" className="contact-btn">
            Contact us now
          </a>
        </div>
      </div>
    </section>
  )
}

export default WhyUs
