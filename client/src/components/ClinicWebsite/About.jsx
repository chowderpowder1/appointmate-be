import React from 'react'
import { Link } from 'react-router'
import './About.css'
import { FaRegCircleCheck } from "react-icons/fa6";
import AboutBottom from './AboutBottom.jsx'

const About = ( gap ) => {
  return (
     <section className="about-section">
            <div className="about-body">
                <div className="about-images-container">

                    <Link to="/Appointment" className="about-btn">Book Now!</Link>
                    <div className="about-images-one"></div>
                    <div className="about-images-two"></div>
                </div>
                
                 <div className="about-text-container">
                    <h4 className="about-title">About Us</h4>
                <h1 className="about-subtext">Don’t Let Your Pain <br/>Hold You Any Longer</h1>
                <p className="about-body-text">At Accelerated Wellness and Pain Clinic, we provide expert, patient-focused care through advanced rehab and pain management. Our licensed team blends clinical precision with a holistic approach to help you recover, heal, and thrive.</p>
                <div>
                    <div className="about-points-container">
                        <FaRegCircleCheck className='about-check-icon' />
                        <div>
                            <h2>Our Mission</h2>
                            <p>To empower every patient with the care, tools, and guidance needed to achieve optimal wellness and a pain-free life.</p>
                        </div>
                        
                    </div>
                    
                    <div className="about-points-container">
                        <FaRegCircleCheck className='about-check-icon' />
                        <div>
                            <h2>Our Approach</h2>
                            <p className="about-points-body-text">We blend clinical therapies with holistic techniques—treating not just the symptoms, but the person as a whole.</p>
                        </div>
                    </div>

                    <div className="about-points-container">
                        <FaRegCircleCheck className='about-check-icon'/>
                        <div>
                            <h2>Our Team</h2>
                            <p>A trusted group of licensed therapists and healthcare professionals committed to compassionate, results-driven care.</p>
                        </div>
                        
                    </div>
                </div>

                </div>
            </div>
           <AboutBottom isHome={true}/>
          
        </section>
  )
}

export default About
