import React from 'react'
import SupportStyles from './PxSupport.module.css'

const PxSupport = () => {
  return (
    <div className={SupportStyles.supportContainer}>
      <h5 className={SupportStyles.supportTitle}>Need help or have questions?</h5>
      <p className={SupportStyles.supportText}>Feel free to call us at <b>+63 923 456 7890</b>, email us at <b>awp-support@email.com</b>, or send us a message on Facebook. We're here to assist you!</p>

        <a href='https://www.facebook.com/AcceleratedWellnessZabarteRdQC' className={SupportStyles.supportBtn}>Contact Clinic</a>
    </div>
  )
}

export default PxSupport
