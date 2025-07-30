import React from 'react'
import CheckListStyles from './CheckList.module.css'
import { FiCheckCircle } from "react-icons/fi";
import CheckListBg from '../../assets/checkListBg.png'

const CheckList = () => {
  return (
    <div className={CheckListStyles.checkListContainer}>
        <h5 className={CheckListStyles.checkListTitle}>Ready for Your Session? Here's a Quick Checklist!</h5>
        <div className={CheckListStyles.checkListBg}>
            <img src={CheckListBg} alt="" />
        </div>
        <div className={CheckListStyles.checkItem}>
          <FiCheckCircle />
          <p>Bring your HMO card or valid ID</p>
        </div>
        <div className={CheckListStyles.checkItem}>
          <FiCheckCircle />
          <p>Include any recent medical records</p>
        </div>
        <div className={CheckListStyles.checkItem}> 
          <FiCheckCircle />
          <p>Wear comfy, stretchable clothes</p>
        </div>
        <div className={CheckListStyles.checkItem}>
          <FiCheckCircle />
          <p>Arrive 10 mins early</p>
        </div>
    </div>
  )
}

export default CheckList
