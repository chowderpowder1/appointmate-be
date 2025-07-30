import React from 'react'
import Hero from '../../components/ClinicWebsite/Hero'
import Card from '../../components/ClinicWebsite/Card'
import About from '../../components/ClinicWebsite/About'
import Services from '../../components/ClinicWebsite/Services'
import Faq from '../../components/ClinicWebsite/Faq'
import Testimonials from '../../components/ClinicWebsite/Testimonials'
import './Homepage.css'

const Homepage = () => {
  return (
    <>
        <Hero/>
        <Card/>
        <About/>
        <Services/>
        <Testimonials/>
        <Faq/>
        
    </>
  )
}

export default Homepage
