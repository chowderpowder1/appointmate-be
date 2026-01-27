import React from 'react'
import './Footer.css'
import {Link} from 'react-router'
import { FaPhoneAlt, FaGlobe, FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoIosMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
    <section className='footer'>
        <div className='news-letter-section'>
            <div className='footer-logo-container'>
                <div className='footer-logo'></div>
            </div>
            <p style={{marginBottom:'1rem'}} className='news-letter-text'>Ready to take the next step toward pain-free living? Contact us today and let us help you feel better, move better, and live better!</p>
            {/* <form action="">
                <label htmlFor=""></label>
                <input className="news-letter-field" type="text" placeholder='your email here' />
            </form> */}
            <p className='news-letter-rights'>© 2024 Accelerated Wellness & Pain Clinic. All Rights Reserved</p>
        </div>

        <div className='contact-us-section ct'>
                <h3 className='section-header'>Contact Us</h3>
            <div>
                <p> <FaPhoneAlt className='contact-icon'/> 09123456789</p>
            </div>
            <div>
                <p> <IoIosMail className='contact-icon'/> awpc@email.com</p>
            </div>
            <div>
                <p> <FaLocationDot className='contact-icon'/> Metro Manila, Philippines</p>
            </div>
            {/* <div>
                <p> <FaGlobe className='contact-icon'/> www.awpclinic.com.ph</p>
            </div> */}
        </div>

        <div className='quick-link-section ct'>
            <h3 className='section-header' >Quick Links</h3>
            <a>About Us</a>
            <a>Services</a>
            <a>HMOs</a>
            <a>FAQs</a>
        </div>

        <div className='social-section ct'>
            <h3 className='section-header' >Social</h3>

            <div className='social-text-container'>
                <FaFacebook className='social-icon-one'/>
                <a href='https://www.facebook.com/AcceleratedWellnessZabarteRdQC.com' className='social-text'>Accelerated Wellness and Pain Clinic</a>
            </div> 

            <div className='social-text-container'>
                <AiFillInstagram className='social-icon-two'/>
                <a href='https://www.instagram.com/accelerated_wellness/?hl=en' className='social-text'>@accelerated_wellness</a>
            </div>
        </div>
        
    </section>
    
    </>
  )
}

export default Footer
