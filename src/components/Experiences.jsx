import React from 'react'
import { Link } from 'react-router-dom'
import CloudinaryImage from './CloudinaryImage'
import './Experiences.css'

const Experiences = () => {
  const experiences = [
    {
      id: 1,
      title: 'GOZO & COMINO Tour',
      imageId: 'gozo-comino',
    },
    {
      id: 2,
      title: 'Supreme Powerboat Tours',
      imageId: 'powerboat',
    },
    {
      id: 3,
      title: 'Comino and Gozo Cruise',
      imageId: 'cruise',
    },
  ]

  return (
    <section id="experiences" className="experiences section">
      <div className="container">
        <h2 className="section-title">Experiences</h2>
        <p className="section-subtitle">
          A wide selection of recurring experiences in Malta such as excursions, boat trips, quad tours, visits, and much more to make your vacation unique.
        </p>
        <div className="experiences-grid">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="experience-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="experience-image">
                {experience.imageId ? (
                  <CloudinaryImage
                    imageId={experience.imageId}
                    alt={experience.title}
                    width={400}
                    height={225}
                    crop="fill"
                  />
                ) : (
                  <div className="image-placeholder">
                    <span>{experience.title}</span>
                  </div>
                )}
              </div>
              <div className="experience-content">
                <h3>{experience.title}</h3>
                <Link to="/experiences" className="experience-btn">Learn More</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="section-footer">
          <Link to="/experiences" className="see-all-btn">
            See all
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Experiences
