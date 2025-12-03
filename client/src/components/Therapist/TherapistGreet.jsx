import React from 'react'
import GreetStyles from './TherapistGreet.module.css'
import Notebook from '../../assets/therapist-notebook.png'
import MockTherapist from '../../assets/mock-therapist.jpg'
import { IoTime } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";

import dayjs from 'dayjs';

// Tanstack
import { useUsers } from '../../queries/users'

const TherapistGreet = ({name}) => {

    const { data: userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
    
    if (userDataIsLoading) return <div>Loading...</div>;
    if (userDataError) return <div>⚠ Error: {userDataError.message}</div>;

  return (
    <div className={GreetStyles.container}>
    <div className={GreetStyles.therapistProfile}>
        <img src={MockTherapist} alt="" />
    </div>
    <div className={GreetStyles.greetText}>
        <h3 className={GreetStyles.therapistName}>Hello, {userData.firstName}</h3>
        <p>Welcome Back</p>
        <div className={GreetStyles.greetTime}>
            <span><FaCalendar className={GreetStyles.timeIcon}/>{dayjs().format('ddd MMM DD ')}</span>
            <span><IoTime className={GreetStyles.timeIcon}/>{dayjs().format('hh:mm A')}</span>
        </div>
    </div>
    <div className={GreetStyles.greetIcon}>
        <img src={Notebook} alt="" />
    </div>
      
    </div>
  )
}

export default TherapistGreet
