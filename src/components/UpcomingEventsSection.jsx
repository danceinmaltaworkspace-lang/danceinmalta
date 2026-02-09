import React from 'react'
import './UpcomingEventsSection.css'

const UpcomingEventsSection = () => {
  return (
    <section className="upcoming-events-section section">
      <div className="container">
        <h2 className="section-title">Upcoming Events</h2>
        <p className="section-subtitle">
          The best events in Malta selected to make your trip unique!
        </p>
        <div className="section-footer">
          <a href="#all-events" className="see-all-btn">
            See all
          </a>
        </div>
      </div>
    </section>
  )
}

export default UpcomingEventsSection
