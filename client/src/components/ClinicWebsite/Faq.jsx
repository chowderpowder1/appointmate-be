import React from 'react'
import './Faq.css'
import { IoIosArrowUp } from "react-icons/io";
import { useState } from 'react'
import CollapsibleCard from './CollapsibleCard'
const Faq = () => {
    
  return (
    <section className="faq-section">

            <div className="faq-section-container-one">
                <h4 className="faq-section-title">FAQs</h4>
                <h1>Got Questions? We’ve Got Answers.</h1>
                <p>
                    Find quick, clear answers to common questions about our services, appointments, <br/>HMOs, and more—so you can feel confident every step of the way.
                </p>
            </div>

            <div className="faq-collapsible-container">
                <CollapsibleCard title='How can I book an appointment?'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum metus finibus dui rutrum, id eleifend elit blandit. Vestibulum nec elit non enim eleifend tempus lacinia et nulla. Donec efficitur, nunc gravida pretium pharetra, enim ante mollis arcu, eu euismod lacus nunc quis felis. Nunc volutpat, augue quis aliquet porta, .
                </CollapsibleCard>
            </div>
            
            <div className="faq-collapsible-container">
                <CollapsibleCard title='What conditions do you treat at Accelerated Wellness and Pain Clinic?'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum metus finibus dui rutrum, id eleifend elit blandit. Vestibulum nec elit non enim eleifend tempus lacinia et nulla. Donec efficitur, nunc gravida pretium pharetra, enim ante mollis arcu, eu euismod lacus nunc quis felis. Nunc volutpat, augue quis aliquet porta, .
                </CollapsibleCard>
            </div>
            
            <div className="faq-collapsible-container">
                <CollapsibleCard title='When should I see an orthopedic doctor?'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dictum metus finibus dui rutrum, id eleifend elit blandit. Vestibulum nec elit non enim eleifend tempus lacinia et nulla. Donec efficitur, nunc gravida pretium pharetra, enim ante mollis arcu, eu euismod lacus nunc quis felis. Nunc volutpat, augue quis aliquet porta, .
                </CollapsibleCard>
            </div>
            
            
        </section>
  )
}

export default Faq
