import React from 'react'
import PaymentStyles from './PaymentMethod.module.css'

const paymentMethod = () => {
  return (
    <div className={PaymentStyles.container}>
        <p className={PaymentStyles.header}>Payment Method</p>
        <div className={PaymentStyles.dataContainer}>
            <div className={PaymentStyles.paymentTypeContainer}>
                <p>HMO</p>
            </div>
            <div className={PaymentStyles.hmoProviderContainer}>
                <p>Maxicare</p>
            </div>
        </div>
    </div>
  )
}

export default paymentMethod
