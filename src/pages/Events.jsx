import React from 'react'
import { Link } from 'react-router-dom'
import CloudinaryImage from '../components/CloudinaryImage'
import './Pages.css'

const Events = () => {
  const events = [
    { id: 1, title: 'Summer Festival 2024', date: 'July 15, 2024', location: 'Valletta', imageId: 'summer-festival' },
    { id: 2, title: 'Boat Party', date: 'July 20, 2024', location: 'Sliema', imageId: 'boat-party' },
    { id: 3, title: 'Beach Party', date: 'July 25, 2024', location: 'Golden Bay', imageId: 'beach-party' },
    { id: 4, title: 'Night Club Event', date: 'August 1, 2024', location: 'St. Julian\'s', imageId: 'nightclub' },
    { id: 5, title: 'Music Festival', date: 'August 10, 2024', location: 'Ta\' Qali', imageId: 'music-festival' },
    { id: 6, title: 'Sunset Party', date: 'August 15, 2024', location: 'Mdina', imageId: 'sunset-party' },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Upcoming Events</h1>
        <p>The best events in Malta selected to make your trip unique!</p>
      </div>
      <div className="container">
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <div className="event-image-placeholder">
                {event.imageId ? (
                  <CloudinaryImage
                    imageId={event.imageId}
                    alt={event.title}
                    width={300}
                    height={200}
                    crop="fill"
                    className="event-image-cloudinary"
                  />
                ) : (
                  <span>Event Image</span>
                )}
              </div>
              <div className="event-details">
                <h3>{event.title}</h3>
                <p className="event-date">📅 {event.date}</p>
                <p className="event-location">📍 {event.location}</p>
                <button className="event-btn">Buy Tickets</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Events
