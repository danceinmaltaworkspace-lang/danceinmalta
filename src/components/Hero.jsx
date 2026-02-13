import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from './CloudinaryImage'
import { siteConfig } from '../config/site'
import { cloudinaryConfig } from '../config/cloudinary'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const sliderRef = useRef(null)
  const [videoBlocked, setVideoBlocked] = React.useState(false)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [touchStart, setTouchStart] = React.useState(0)
  const [touchEnd, setTouchEnd] = React.useState(0)
  const { language } = useLanguage()
  const t = translations[language]

  const heroVideoId = siteConfig.heroVideoId || ''
  const heroVideoUrl = siteConfig.heroVideoUrl || ''
  const cloudName = cloudinaryConfig.cloudName
  const showVideo = heroVideoId || heroVideoUrl
  
  const slides = [
    { id: 1, imageId: 'samples/ecommerce/accessories-bag' },
    { id: 2, imageId: 'samples/ecommerce/leather-bag-gray' },
    { id: 3, imageId: 'samples/landscapes/architecture-signs' }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
    setTouchStart(0)
    setTouchEnd(0)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const tryPlayVideo = React.useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    const p = video.play()
    if (p && typeof p.then === 'function') {
      p.then(() => setVideoBlocked(false)).catch(() => setVideoBlocked(true))
    }
  }, [])

  useEffect(() => {
    if (!heroVideoId) return
    const t = setTimeout(() => tryPlayVideo(), 300)
    return () => clearTimeout(t)
  }, [heroVideoId, tryPlayVideo])

  // Autoplay slider
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 4000) // Cambio slide ogni 4 secondi

    return () => clearInterval(interval)
  }, [currentSlide])

  return (
    <section id="home" className="hero" ref={heroRef}>
      {showVideo && (
        <div className="hero-video-background">
          {heroVideoId ? (
            <video
              ref={videoRef}
              className="hero-video-bg"
              title="Dance in Malta video"
              muted
              loop
              playsInline
              preload="auto"
              onLoadedData={tryPlayVideo}
              onCanPlay={tryPlayVideo}
            >
              <source
                src={`https://res.cloudinary.com/${cloudName}/video/upload/f_mp4,q_auto/${heroVideoId}`}
                type="video/mp4"
              />
              <source
                src={`https://res.cloudinary.com/${cloudName}/video/upload/q_auto,f_auto/${heroVideoId}`}
                type="video/mp4"
              />
            </video>
          ) : (
            <iframe
              src={heroVideoUrl}
              title="Dance in Malta video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="hero-video-bg"
            />
          )}
          <div className="hero-video-overlay"></div>
        </div>
      )}
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title fade-in">
          {t.heroTitle}
        </h1>
        <Link to="/events" className="hero-subtitle hero-subtitle-link fade-in">
          {t.heroSubtitle}
        </Link>
        <div 
          className="hero-slider" 
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button 
            type="button" 
            className="hero-slider-btn prev" 
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <div className="hero-slider-track">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              >
                {slide.imageId ? (
                  <CloudinaryImage
                    imageId={slide.imageId}
                    alt={`Event slide ${index + 1}`}
                    width={900}
                    height={506}
                    crop="fill"
                    className="hero-slide-image"
                  />
                ) : (
                  <div className="image-placeholder">
                    <span>{slide.placeholder}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button 
            type="button" 
            className="hero-slider-btn next" 
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
          <div className="hero-slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`hero-slider-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
