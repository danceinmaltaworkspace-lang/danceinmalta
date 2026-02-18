import React from 'react'
import Hero from '../components/Hero'
import WhatWeDo from '../components/WhatWeDo'
import WhatIsDIM from '../components/WhatIsDIM'
import Testimonials from '../components/Testimonials'
import WhyUs from '../components/WhyUs'
import UpcomingEvents from '../components/UpcomingEvents'

const Home = () => {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <UpcomingEvents />
      <WhatIsDIM />
      <Testimonials />
      <WhyUs />
    </>
  )
}

export default Home
