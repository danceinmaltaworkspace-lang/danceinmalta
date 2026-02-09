import React, { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { translations } from '../i18n/translations'
import CloudinaryImage from './CloudinaryImage'
import { siteConfig } from '../config/site'
import { cloudinaryConfig } from '../config/cloudinary'
import './Hero.css'

const Hero = () => {
  const heroRef = useRef(null)
  const videoRef = useRef(null)
  const [videoBlocked, setVideoBlocked] = React.useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  const heroVideoId = siteConfig.heroVideoId || ''
  const heroVideoUrl = siteConfig.heroVideoUrl || ''
  const cloudName = cloudinaryConfig.cloudName
  const showVideo = heroVideoId || heroVideoUrl

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

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title fade-in">
          {t.heroTitle}
        </h1>
        <p className="hero-subtitle fade-in">
          {t.heroSubtitle}
        </p>
        <div className="hero-images">
          <div className="hero-image-item slide-in-left">
            <div className="image-placeholder">
              <span>Event Image 1</span>
            </div>
          </div>
          <div className="hero-image-item slide-in-right">
            <div className="image-placeholder">
              <span>Event Image 2</span>
            </div>
          </div>
          <div className="hero-image-item fade-in">
            <div className="image-placeholder">
              <span>Event Image 3</span>
            </div>
          </div>
        </div>
        {showVideo && (
          <div className="hero-video-wrap fade-in">
            <div className="hero-video-inner">
              {heroVideoId ? (
                <>
                  <video
                    ref={videoRef}
                    className="hero-video-iframe"
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
                  {videoBlocked && (
                    <button
                      type="button"
                      className="hero-video-play-btn"
                      onClick={() => { tryPlayVideo() }}
                      aria-label="Play video"
                    >
                      ▶
                    </button>
                  )}
                </>
              ) : (
                <iframe
                  src={heroVideoUrl}
                  title="Dance in Malta video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="hero-video-iframe"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
