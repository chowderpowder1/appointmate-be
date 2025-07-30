import React from 'react'
import { Link } from 'react-router'
import './Hero.css'
import { IoMdCalendar } from "react-icons/io";

const Hero = () => {
  return (

    <section className="hero-section">
            <div className="hero-background"></div>
            <div className="hero-gradient"></div>

            <div className="hero-text">
                <h4>Welcome to Accelerated Wellness & Pain!</h4>
                <h1>Your Path to Pain-Free <br/> Living Starts Here</h1>
                <p>Combining evidence-based therapies with a holistic approach to healing, we provide personalized care using advanced rehabilitation technologies and hands-on expertise. Whether you're managing chronic pain or recovering from injury, our goal is to restore your well-being—body, mind, and movement.</p>
                <Link to='/Appointment' className='appointment-btn' ><IoMdCalendar  className='appointment-icon' />Book an Appointment</Link>
            </div>
        </section>
       
  )
}

export default Hero
