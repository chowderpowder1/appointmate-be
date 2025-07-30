import React from 'react'
import Carousel from './Carousel'
import './Testimonials.css'
import { IoIosArrowForward,IoIosArrowBack  } from "react-icons/io";

const Testimonials = () => {
  return (
    <section className="testimonial-section">
                <div className="testimonial-header-container">
                    <h4 className="testimonial-section-title">Testimonials</h4>
                    <h1 className="testimonial-section-header">What Our Patients Say</h1>
                    <p>Real stories. Real results. Hear how our care has made a difference in the lives of patients on their journey to recovery and wellness.</p>
                </div>
                <div className='carousel-container'>
                    <button className="custom-prev"><IoIosArrowBack className='testimonialIcon'/></button>
                    <Carousel/>
                    <button className="custom-next"><IoIosArrowForward className='testimonialIcon'/></button>
                </div>
                
    </section>
  )
}

export default Testimonials
