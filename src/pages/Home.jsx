import React from 'react'
import Hero from '../components/Hero'
import WhatIsDIM from '../components/WhatIsDIM'
import Testimonials from '../components/Testimonials'
import WhyUs from '../components/WhyUs'
import UpcomingEvents from '../components/UpcomingEvents'
import TopExperiences from '../components/TopExperiences'

const Home = () => {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <TopExperiences />
      <WhatIsDIM />
      <Testimonials />
      <WhyUs />
    </>
  )
}

export default Home
