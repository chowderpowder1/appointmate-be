import { React, useState } from 'react'
import OnboardingStyles from './OnboardingContainer.module.css'
import Stepper from '../Onboarding/Stepper'
import Button from '@mui/material/Button';

// Stepper Pages
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import StepComplete from './StepComplete'

// useContext
import { useContext } from 'react';
import StepperContext from './StepperContext';
import StepperProvider from './StepperContext'
// const StepperContext = createContext();

const OnboardingContainer = () => {

    // const [formData, setFormData] = useState({
    //   firstName: '',
    //   lastName: '',
    //   email: ''
    // });

    //  const updateFormData = (field, value) => {
    //   setFormData(prev => ({ ...prev, [field]: value }));
    // };

    const pages = [StepOne, StepTwo, StepThree, StepFour, StepComplete]
    const [currentStep, setCurrentStep] = useState(0);
    const numberOfSteps = 4;
    const stepDescription = ['Personal Information', 'Contact Information', 'Coverage & Identification', ' Emergency Information']
    const nextBtn = () => setCurrentStep(current => current === numberOfSteps ?  currentStep: currentStep + 1);
    const prevBtn = () => setCurrentStep(current => current === 0 ?  currentStep : currentStep - 1);
  return (
    // <StepperContext value={{formData, setFormData}}>
    <div className={OnboardingStyles.container}>
        <div className={OnboardingStyles.headerContainer}>
          {currentStep !== numberOfSteps && <> <p className={OnboardingStyles.header}>Let's Get You Started</p>
            <p className={OnboardingStyles.subHeader}>Complete your profile to finish setting up your account</p></>}
           
        </div>
        {currentStep !== numberOfSteps && <Stepper currentStep={currentStep} numberOfSteps={numberOfSteps} stepDescription={stepDescription} pages={pages}></Stepper>}

        {currentStep === numberOfSteps && <StepComplete/>}
        
         {currentStep !== numberOfSteps && <div className={OnboardingStyles.btnContainer}>
            <Button variant="contained" onClick={prevBtn}>Previous</Button>
            <Button variant="contained" onClick={nextBtn}>Next</Button>
        </div>}
        <p></p>
    </div>
    // </StepperContext>
  )
}
// export const useStepperContext = () => {
//   return useContext(StepperContext);
// };

export default OnboardingContainer
