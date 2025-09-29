import React from 'react'
import MiniStyles from './MiniVerticalStepper.module.css'
import { FaCheck } from "react-icons/fa";

const MiniVerticalStepper = () => {

    const mockObject = [
 {
        date: '08 May 2025',
        status: 'completed'
    },
    {
        date: '15 June 2025',
        status: 'completed'
    },
    {
        date: '22 July 2025',
        status: 'completed'
    },
    {
        date: '03 Aug 2025',
        status: 'completed'
    },
    {
        date: '10 Sept 2025',
        status: 'pending'
    },
    {
        date: '18 Oct 2025',
        status: 'not yet set'
    },
    {
        date: '25 Nov 2025',
        status: 'not yet set'
    }
    ]
  return (
    <div className={MiniStyles.mainContainer}>
        {mockObject.map(( data, key)=>(
                  <div key={key} className={MiniStyles.row}>
        <div className={MiniStyles.indicatorContainer}>
            <div className={`${ data.status == 'completed' ? MiniStyles.statusCompleted :( data.status==='pending' ? MiniStyles.circlePending : (data.status==='not yet set' ? MiniStyles.statusTba: ''))} ${MiniStyles.circle}`}>

                {data.status==='completed' ? (
                    <FaCheck style={{color:'white', fontSize: '.8rem'}}/>
                ):''}

                {data.status==='pending' ? (
                    <div className={MiniStyles.miniCirclePending}></div>
                ):''}

            </div>

            <div className={`${ data.status == 'completed' ? MiniStyles.statusCompleted :( data.status==='pending' ? MiniStyles.statusTba : (data.status==='not yet set' ? MiniStyles.statusTba: ''))} ${MiniStyles.line}`}></div>
            
        </div>
        <div className={MiniStyles.textContainer}>
            <p className={MiniStyles.textDate}>{data.date}</p>
            <p className={`${ data.status == 'completed' ? MiniStyles.statusCompleted :( data.status==='pending' ? MiniStyles.statusPending : (data.status==='not yet set' ? MiniStyles.statusTba: ''))} ${MiniStyles.textStatus}`}>{data.status}</p>
        </div>
      </div>
        ))}

    </div>
  )
}

export default MiniVerticalStepper
