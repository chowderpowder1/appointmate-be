import React from 'react'
import GreetStyles from './TherapistGreet.module.css'
import Notebook from '../../assets/therapist-notebook.png'
import MockTherapist from '../../assets/mock-therapist.jpg'
import { IoTime } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";

const TherapistGreet = ({name}) => {
  return (
    <div className={GreetStyles.container}>
    <div className={GreetStyles.therapistProfile}>
        <img src={MockTherapist} alt="" />
    </div>
    <div className={GreetStyles.greetText}>
        <h3 className={GreetStyles.therapistName}>Hello, {name}</h3>
        <p>Welcome Back</p>
        <div className={GreetStyles.greetTime}>
            <span><FaCalendar className={GreetStyles.timeIcon}/>Monday, May 22, 2025</span>
            <span><IoTime className={GreetStyles.timeIcon}/>8:01 AM</span>
        </div>
    </div>
    <div className={GreetStyles.greetIcon}>
        <img src={Notebook} alt="" />
    </div>
      
    </div>
  )
}

export default TherapistGreet
