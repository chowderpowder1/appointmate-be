import React from 'react'
import NotFoundStyles from './InvalidToken.module.css'
import NotFoundVector from '../../public/notFound.png'
const InvalidToken = () => {
  return (
    <div className={NotFoundStyles.container}>
              <h1 className={NotFoundStyles.header} style={{marginTop:'3rem'}}>This link has expired for security reasons. Please request a new one.</h1>
        <img src={NotFoundVector} alt="" />

      <p className={NotFoundStyles.text}>The page you requested cannot be displayed right now. It may be temporarily unavailable, the link you clicked on may be broken or expired.</p>
    </div>
  )
}

export default InvalidToken
