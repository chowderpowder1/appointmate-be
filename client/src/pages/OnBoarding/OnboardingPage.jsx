import { React, useState } from 'react'
import OnboardingStyles from './OnboardingPage.module.css'
import OnboardingContainer from '../../components/Onboarding/OnboardingContainer' 
import {useCountries} from '../../queries/countries.js'

const OnboardingPage = () => {
  return (
    
    <div className={OnboardingStyles.container}>
      <OnboardingContainer/>
      
    </div>
  )
}

export default OnboardingPage
