import React from 'react'
import './AboutBottom.css'

const AboutBottom = ({ isHome = false }) => {

  return (
    <div className={ isHome ? 'about-page-bottom about-page-home' : 'about-page-bottom'}>
        <div className="about-page-bottom-container">
            <h3 className="about-page-bottom-title">1000+</h3>
            <p className="about-page-bottom-text">Treatments per month</p>
        </div>
        <div className="vl"></div>
        <div className="about-page-bottom-container">
            <h3 className="about-page-bottom-title">10</h3>
            <p className="about-page-bottom-text">Locations Serving You Nationwide</p>
        </div>
        
        <div className="vl"></div>
        <div className="about-page-bottom-container">
            <h3 className="about-page-bottom-title">23</h3>
            <p className="about-page-bottom-text">Accredited HMOs Accepted</p>
        </div>
    </div>
  )
}

export default AboutBottom
