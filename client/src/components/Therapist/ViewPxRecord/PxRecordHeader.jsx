import React from 'react'
import HeaderStyles from './PxRecordHeader.module.css'
const PxRecordHeader = () => {
  return (
        <div className={HeaderStyles.headerContainer}>
          <div className={HeaderStyles.pxNameContainer}>
            <div className={HeaderStyles.lineStyle}/>
            <p className={HeaderStyles.pxDataHeader}>Patient Name:</p>
            <p>Riana Buenagua</p>               
          </div>
          <div className={HeaderStyles.pxNumberContainer}>
            <div className={HeaderStyles.lineStyle}/>
            <p className={HeaderStyles.pxDataHeader}>Patient Number:</p>
            <p>P-09</p>               
          </div>
        </div>    
  )
}

export default PxRecordHeader
