import { React, useState } from 'react'
import OnboardingStyles from './OnboardingPage.module.css'
import OnboardingContainer from '../../components/Onboarding/OnboardingContainer' 
import {useCountries} from '../../queries/countries.js'
import AwLogo from '../../assets/aw-logo-lowRes.png'

const OnboardingPage = () => {
  return (
    
    <div className={OnboardingStyles.container}>
      <div className={OnboardingStyles.navbar}>
        <div className={OnboardingStyles.logoContainer}><img src={AwLogo} alt=""/></div>
        <p>Accelerated Wellness & Pain Clinic</p>
      </div>
      <OnboardingContainer/>
      
    </div>
  )
}

export default OnboardingPage
