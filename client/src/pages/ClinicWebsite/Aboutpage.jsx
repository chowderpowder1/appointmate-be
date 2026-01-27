import React from 'react'
import HeroGen from '../../components/Ui/HeroGen'
import './Aboutpage.css'
import RedHeader from '../../components/Ui/RedHeader'
import AboutBottom from '../../components/ClinicWebsite/AboutBottom'
import BodyGen from '../../components/ClinicWebsite/BodyGen'
import CheckGen from '../../components/Ui/CheckGen'
import AboutCarousel from '../../components/ClinicWebsite/AboutCarousel'
import AboutPageBg from '../../assets/about-hero.png'

const Aboutpage = () => {
  return (
    <>
    <HeroGen bgSrc={AboutPageBg} header='About Us'></HeroGen>

    <section className='about-page-section-one'>

        <div className="about-page-text-container">
            <RedHeader title='We  are Accelerated Wellness & Pain Clinic!'/>
            <h1 className='about-page-header'>Don’t Let Your Pain Hold You Any Longer</h1>
            <p>At Accelerated Wellness and Pain Clinic, we provide expert, patient-focused care through advanced rehab and pain management. Our licensed team blends clinical precision with a holistic approach to help you recover, heal, and thrive.</p>
            
             <AboutBottom/>
        </div>

        <div className="about-page-images-container">
            <div className="about-page-images-one"></div>
            <div className="about-page-images-two"></div>
        </div>

    </section>

    <section className="about-page-section-two">
        <div className="about-commitment-image-container">
            <div className="about-commitment-image">
                <div className='about-commitment-image-comment'>
                    <p>
                        "At Accelerated Wellness, our goal is simple—to help every patient live with less pain and more freedom."
                    </p>
                    <p>— Owner’s Name, Founder</p>
                </div>
            </div>
        </div>
        <div className="about-commitment-text-container">
            <RedHeader title='Mission & Vision'/>
            <BodyGen title='About Our Commitment' ><p style={{width:"80%", textAlign:"justify"}}>At Accelerated Wellness and Pain Clinic, we are driven by a purpose—to provide compassionate, expert care that empowers healing and enhances lives. Our vision and mission guide every step of our service.</p></BodyGen>

            <CheckGen title='Our Mission'><p>To deliver accessible, patient-centered therapies using advanced technology and expert care, helping individuals recover, restore function, and improve their quality of life.</p></CheckGen>
            <CheckGen title='Our Vision'><p>To be a leading center for pain management and rehabilitation, recognized for excellence in patient care, innovation, and holistic healing.</p></CheckGen>
        </div>
            
    </section>
{/* 
    <section>
        <AboutCarousel/>
    </section> */}

    </>
  )
}

export default Aboutpage
