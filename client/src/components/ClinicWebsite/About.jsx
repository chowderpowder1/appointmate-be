import React from 'react'
import { Link } from 'react-router'
import AboutStyles from './About.module.css'
import { FaRegCircleCheck } from "react-icons/fa6";
import AboutBottom from './AboutBottom.jsx'
import ImgUnder from '../../assets/about-image-1.png'
import ImgOver from '../../assets/about-image-2.png'
import { TbTargetArrow } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";

const About = ( gap ) => {
  return (
    <section className={AboutStyles['about-section']}>
    <div className={AboutStyles['about-body']}>
      <div className={AboutStyles['about-images-container']}>

      <Link to="/Appointment" className={AboutStyles['about-btn']}>Book Now!</Link>
      <div className={AboutStyles.imageUnderContainer}>
        <img src={ImgUnder} className={AboutStyles.imageUnder} alt="" />
      </div>
      <div className={AboutStyles.imageOverContainer}>
        <img src={ImgOver} className={AboutStyles.imageOver} alt="" />
      </div>
    </div>
    
    <div className={AboutStyles['about-text-container']}>
      <h4 className={AboutStyles['about-title']}>About Us</h4>
      <h1 className={AboutStyles['about-subtext']}>
        Don't Let Your Pain Hold You Any Longer
      </h1>
      <p className={AboutStyles['about-body-text']}>
        At Accelerated Wellness and Pain Clinic, we provide expert, patient-focused care through advanced rehab and pain management. Our licensed team blends clinical precision with a holistic approach to help you recover, heal, and thrive.
      </p>

      <div>
        <div className={AboutStyles['about-points-container']}>
          <FaRegCircleCheck className={AboutStyles['about-check-icon']} />
          <TbTargetArrow className={AboutStyles.mobileIcon}/>
          <div>
            <h2>Our Mission</h2>
            <p>To empower every patient with the care, tools, and guidance needed to achieve optimal wellness and a pain-free life.</p>
          </div>
        </div>
        
        <div className={AboutStyles['about-points-container']}>
          <FaRegCircleCheck className={AboutStyles['about-check-icon']} />
          <FaEye className={AboutStyles.mobileIcon}/>
          <div>
            <h2>Our Approach</h2>
            <p className={AboutStyles['about-points-body-text']}>
              We blend clinical therapies with holistic techniques—treating not just the symptoms, but the person as a whole.
            </p>
          </div>
        </div>

        <div className={AboutStyles['about-points-container']}>
          <FaRegCircleCheck className={AboutStyles['about-check-icon']} />
          <FaUserDoctor className={AboutStyles.mobileIcon}/>
          <div>
            <h2>Our Team</h2>
            <p>
              A trusted group of licensed therapists and healthcare professionals committed to compassionate, results-driven care.
            </p>
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
