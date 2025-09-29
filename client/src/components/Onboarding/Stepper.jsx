import React from 'react'
import StepperStyles from './Stepper.module.css'
import { FaCheck } from "react-icons/fa";

const Stepper = ({ currentStep, numberOfSteps, stepDescription, pages}) => {
    const activeStep = (index) => currentStep >= index ? 'activeStep': ''
    const doneStep = (index) => index < currentStep  ? 'doneIndicator' : ''
    const activeLine = (index) => (currentStep - 1) >= index ? 'activeLine': ''
    const activeText = (index) => currentStep >= index ? 'activeText': ''
    const isFinalStep = (index) => index === numberOfSteps -1;
    var CurrentPage = pages[currentStep];
    return (
    <div className={StepperStyles.container}>
        <div className={StepperStyles.stepperContainer}>
                {Array.from({length: numberOfSteps}).map((_, index) =>(
                    <React.Fragment key={index}>
                        <div className={StepperStyles.textContainer}>
                            <div className={`${StepperStyles.circle} ${StepperStyles[activeStep(index)]} ${StepperStyles[doneStep(index)]}`}><FaCheck className={StepperStyles.checkIcon}/></div>
                            <p className={`${StepperStyles.stepText} ${StepperStyles[activeText(index)]}`}>{stepDescription[index]}</p>
                        </div>
                        {isFinalStep(index)? null :<span className={`${StepperStyles.line} ${StepperStyles[activeLine(index)]}`}></span>}
        
                    </React.Fragment>
        
                ))}
        </div>
        <CurrentPage />

    </div>
  )
}

export default Stepper
