import { React, useState } from 'react'
import OnboardingStyles from './OnboardingPage.module.css'
import OnboardingContainer from '../../components/Onboarding/OnboardingContainer' 

const OnboardingPage = () => {

  return (
    <div className={OnboardingStyles.container}>
      <OnboardingContainer/>
      
    </div>
  )
}

export default OnboardingPage
