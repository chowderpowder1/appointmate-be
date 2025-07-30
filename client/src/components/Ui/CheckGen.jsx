import React from 'react'
import './CheckGen.css'
import { FaRegCircleCheck } from "react-icons/fa6";

const CheckGen = ({children, title}) => {
  return (
    <div className="check-mark-container">
        <div className="iconContainer">
          <FaRegCircleCheck className='check-mark-icon'/>
        </div>
        <div>
            <h2>{title}</h2>
            <p className="check-mark-body-text">{children}</p>
        </div>
    </div>
  )
}

export default CheckGen
