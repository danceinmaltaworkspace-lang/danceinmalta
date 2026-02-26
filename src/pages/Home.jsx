import React from 'react'
import Hero from '../components/Hero'
import WhatIsDIM from '../components/WhatIsDIM'
import Testimonials from '../components/Testimonials'
import WhyUs from '../components/WhyUs'
import UpcomingEvents from '../components/UpcomingEvents'
import ExperiencesSection from '../components/ExperiencesSection'

const Home = () => {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <WhatIsDIM />
      <ExperiencesSection />
      <Testimonials />
      <WhyUs />
    </>
  )
}

export default Home
