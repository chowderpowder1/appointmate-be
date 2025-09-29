import React from 'react'
import './Services.css'
import { HiOutlineSignal } from "react-icons/hi2";
import { PiNeedleFill } from "react-icons/pi";
import { PiWaveform } from "react-icons/pi";
import { SiSpine } from "react-icons/si";
import { TbRazorElectric } from "react-icons/tb";
import { TbMassage } from "react-icons/tb";
import { BsFillMagnetFill } from "react-icons/bs";
import { TbBedFlatFilled } from "react-icons/tb";
const Services = () => {
  return (
    <section className="services-section">
            <div className="services-background">
                <div className="services-header-container">
                    <h4 className="services-section-title">Our Services</h4>
                    <h1 className="services-section-header">Physical Therapy and Rehabilitation Clinic</h1>
                    <p>We have the latest, safe, and advanced US based Physical Therapy Treatment combined with:</p>
                </div>
                
                <div className="services-gallery">
                    <div className="services-card">
                        <HiOutlineSignal className="bi"/>
                        <h2>Shockwave Therapy</h2>
                        <p>A non-invasive treatment that uses sound waves to stimulate healing, reduce pain, and break down scar tissue.</p>
                    </div>
                    <div className="services-card">
                        <PiNeedleFill className="bi"/>
                        <h2>Dry Needling</h2>
                        <p>Targets muscle trigger points using fine needles to relieve tension, improve mobility, and reduce pain.</p>
                    </div>
                    <div className="services-card">
                        <PiWaveform className="bi"/>
                        <h2>Radiofrequency Therapy </h2>
                        <p>Delivers controlled heat to nerve tissues, reducing chronic pain by interrupting pain signals.</p>
                    </div>
                    <div className="services-card">
                        <SiSpine className="bi"/>
                        <h2>Spinal Manipulation</h2>
                        <p>A hands-on technique that adjusts the spine to relieve pressure, improve alignment, and restore movement.</p>
                    </div>
                    <div className="services-card">
                        <TbRazorElectric className="bi"/>
                        <h2>Microcurrent Therapy</h2>
                        <p>Uses low-level electrical currents to accelerate tissue healing, reduce inflammation, and ease pain.</p>
                    </div>
                    <div className="services-card">
                        <TbMassage className="bi"/>
                        <h2>Manual Therapy</h2>
                        <p>Hands-on techniques like massage and joint mobilization to relieve pain, improve range of motion, and restore function.</p>
                    </div>
                    <div className="services-card">
                        <BsFillMagnetFill className="bi"/>
                        <h2>Magneto Therapy</h2>
                        <p>Applies pulsed magnetic fields to stimulate healing, enhance circulation, and reduce inflammation.</p>
                    </div>
                    <div className="services-card">
                        <TbBedFlatFilled className="bi"/>
                        <h2>TECAR Therapy</h2>
                        <p>A deep-tissue therapy using radiofrequency energy to boost cellular repair, improve circulation, and relieve musculoskeletal pain.</p>
                    </div>
                </div>
                
            </div>
        </section>
  )
}

export default Services
