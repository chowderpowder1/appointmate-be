import React from 'react'
import './Card.css'
import { LuCalendarCheck2 } from "react-icons/lu";
import { FaHandHoldingMedical } from "react-icons/fa6";
import { PiListPlusFill } from "react-icons/pi";

const Card = () => {
  return (
    <section className="services-container">
            <div className="services">
                <LuCalendarCheck2 className='bi' />
                <h1> Book Appointments Anytime</h1>
                <p>Schedule your therapy sessions online—anytime, anywhere. It's fast, easy, and skips the waiting line.</p>
            </div>
            <div className="services">
                <FaHandHoldingMedical className='bi' />
                <h1> Personalized Treatment Plans</h1>
                <p>Every patient is unique. Our expert team tailors therapy plans to match your specific condition, goals, and progress.</p>
            </div>
            <div className="services">
                <PiListPlusFill className='bi' />
                <h1> Seamless Medical Records</h1>
                <p>Access your treatment history, progress notes, and appointments—all in one secure, digital platform.</p>
            </div>
    </section>
  )
}

export default Card
