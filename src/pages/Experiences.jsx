import React from 'react'
import CloudinaryImage from '../components/CloudinaryImage'
import './Pages.css'

const Experiences = () => {
  const experiences = [
    {
      id: 1,
      title: 'GOZO & COMINO Tour',
      description: 'Discover the beautiful islands of Gozo and Comino with our exclusive tour. Visit the Blue Lagoon and explore the stunning landscapes.',
      duration: 'Full Day',
      price: '€45',
      imageId: 'gozo-comino-tour'
    },
    {
      id: 2,
      title: 'Supreme Powerboat Tours',
      description: 'Experience the thrill of speed on the Mediterranean Sea with our powerboat tours. Perfect for adventure seekers!',
      duration: '2 Hours',
      price: '€60',
      imageId: 'powerboat-tours'
    },
    {
      id: 3,
      title: 'Comino and Gozo Cruise',
      description: 'Relax and enjoy a scenic cruise to Comino and Gozo. Swim in crystal clear waters and enjoy the Mediterranean sun.',
      duration: 'Full Day',
      price: '€50',
      imageId: 'comino-cruise'
    },
    {
      id: 4,
      title: 'Quad Tours',
      description: 'Explore Malta\'s countryside on a quad bike. An exciting way to see the island\'s hidden gems.',
      duration: '3 Hours',
      price: '€55',
      imageId: 'quad-tours'
    },
    {
      id: 5,
      title: 'Historical Tours',
      description: 'Discover Malta\'s rich history with guided tours of ancient temples, fortresses, and historical sites.',
      duration: 'Half Day',
      price: '€35',
      imageId: 'historical-tours'
    },
    {
      id: 6,
      title: 'Diving Experiences',
      description: 'Dive into the crystal clear waters of Malta and explore underwater caves and marine life.',
      duration: 'Half Day',
      price: '€70',
      imageId: 'diving-experiences'
    },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Experiences</h1>
        <p>A wide selection of recurring experiences in Malta such as excursions, boat trips, quad tours, visits, and much more to make your vacation unique.</p>
      </div>
      <div className="container">
        <div className="experiences-list">
          {experiences.map((experience) => (
            <div key={experience.id} className="experience-item">
              <div className="experience-image-placeholder">
                {experience.imageId ? (
                  <CloudinaryImage
                    imageId={experience.imageId}
                    alt={experience.title}
                    width={300}
                    height={250}
                    crop="fill"
                    className="experience-image-cloudinary"
                  />
                ) : (
                  <span>{experience.title}</span>
                )}
              </div>
              <div className="experience-details">
                <h3>{experience.title}</h3>
                <p className="experience-description">{experience.description}</p>
                <div className="experience-info">
                  <span className="experience-duration">⏱️ {experience.duration}</span>
                  <span className="experience-price">{experience.price}</span>
                </div>
                <button className="experience-btn">Book Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experiences
