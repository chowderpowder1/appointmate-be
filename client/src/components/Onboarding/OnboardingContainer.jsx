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
import {useAppContext} from './AppContext.jsx'
import {useCountries} from '../../queries/countries.js'

const OnboardingContainer = () => {

    const {formData, setFormData} = useAppContext();

    const pages = [StepOne, StepTwo, StepThree, StepFour, StepComplete]
    const [currentStep, setCurrentStep] = useState(0);
    const numberOfSteps = 4;
    const stepDescription = ['Personal Information', 'Contact Information', 'Coverage & Identification', ' Emergency Information']
    const nextBtn = () => setCurrentStep(current => current === numberOfSteps ?  currentStep: currentStep + 1);
    const prevBtn = () => setCurrentStep(current => current === 0 ?  currentStep : currentStep - 1);

const checkNestedEmpty = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && key != 'dob') {

      if (checkNestedEmpty(obj[key])) {
        console.log(obj[key]) 
        return true
      };
    } else if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
      return true;
    }
  }
  console.log(formData)
  return false;

};

  return (
    // <StepperContext value={{formData, setFormData}}>
    <div className={OnboardingStyles.container}>
        <div className={OnboardingStyles.headerContainer}>
          {currentStep !== numberOfSteps && <> <p className={OnboardingStyles.header}>Let's Get You Started {formData.personalInfo.lastName}</p>
            <p className={OnboardingStyles.subHeader}>Complete your profile to finish setting up your account</p></>}
           
        </div>

        {/* Logic Body for rendering fields */}
        {currentStep !== numberOfSteps && <Stepper currentStep={currentStep} numberOfSteps={numberOfSteps} stepDescription={stepDescription} pages={pages}></Stepper>}

        {currentStep === numberOfSteps && <StepComplete/>}
        
         {currentStep !== numberOfSteps && <div className={OnboardingStyles.btnContainer}>
            <Button variant="contained" onClick={prevBtn}>Previous</Button>
            <Button  disabled={currentStep === 3 && checkNestedEmpty(formData)}
            variant="contained" onClick={()=>{
              nextBtn()
              }}>{currentStep != (numberOfSteps-1) ? 'Next' : 'Submit'}</Button>
        </div>}
    </div>
    // </StepperContext>
  )
}
// export const useStepperContext = () => {
//   return useContext(StepperContext);
// };

export default OnboardingContainer
