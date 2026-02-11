import React from 'react'
import CircularStyles from './CircularStepper.module.css'
import RedHeader from '../../components/Ui/RedHeader'
import '../../index.css'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularStepper = ({sessionData}) => {
    
    const sessionsUndertaken= sessionData?.numberOfSessions || '0'
    const percentage = sessionsUndertaken;
    console.log(sessionData)
    return (
    <>
        <div className={CircularStyles.circularStepperContainer}>
          <div className={CircularStyles.circularStepperTextContainer}>
            <RedHeader title='Your Therapy Progress'></RedHeader>
            {sessionData ?  
            <>
            <h1 className={CircularStyles.circularStepperTitle}>
              Every session Counts
            </h1>
            <p className={CircularStyles.circularStepperText}>
              You're getting there. Stay Strong!
            </p></> :  
            <>
            <h1 className={CircularStyles.circularStepperTitle}>
              Select a session!
            </h1>

            <p className={CircularStyles.circularStepperText}>
                You can view your progress here.
            </p>
            </>
            }
           
          </div>

          <div className={CircularStyles.circularStepper}>
     <CircularProgressbarWithChildren
                  value={percentage}
                  text={`${percentage}`}
                  background = {true}
                  backgroundPadding= {1}
                  strokeWidth={18}
                  fontWeight={600}
                  styles={buildStyles({
                    // Rotation of path and trail, in number of turns (0-1)
                    rotation: 0.25,
                
                    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                    strokeLinecap: 'round',
                    
                    // Text size
                    textSize: '16px',
                    // How long animation takes to go from one percentage to another, in seconds
                    pathTransitionDuration: 0.5,
                
                    // Can specify path transition in more detail, or remove it entirely
                    // pathTransition: 'none',
                
                    // Colors
                    fontWeight:'800px',
                    pathColor: `rgba(25, 118, 213, ${percentage})`,
                    textColor: '#1976D5',
                    trailColor: '#97ABC0',
                    backgroundColor: 'transparent',
                  })}
                  // shit placed inside the stepper container is dynamically centered inside the circle
                >
                  <div style={{fontSize:'.7rem', marginTop:'3rem', color:'#575757'}}>
                    out of 6 sessions
                  </div>
                </CircularProgressbarWithChildren>
            </div>
          </div>
    </>
  )
}

export default CircularStepper


