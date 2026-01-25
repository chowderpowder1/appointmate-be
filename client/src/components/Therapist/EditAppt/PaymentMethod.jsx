import React from 'react'
import PaymentStyles from './PaymentMethod.module.css'

const paymentMethod = (apptData) => {
    const data = apptData.apptData
    console.log(data)
  return (
    <div className={PaymentStyles.container}>
        <p className={PaymentStyles.header}>Payment Method</p>
        <div className={PaymentStyles.dataContainer}>
            <div className={PaymentStyles.paymentTypeContainer}>
                <p>{data.mop}</p>
            </div>
           { data.mop !== 'CASH' && <div className={PaymentStyles.hmoProviderContainer}>
                <p>Maxicare</p>
            </div>}
        </div>
    </div>
  )
}

export default paymentMethod
