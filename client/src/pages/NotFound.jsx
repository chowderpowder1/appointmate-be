import React from 'react'
import NotFoundStyles from './NotFound.module.css'
import NotFoundVector from '../../public/notFound.png'
const NotFound = () => {
  return (
    <div className={NotFoundStyles.container}>
              <h1 className={NotFoundStyles.header} style={{marginTop:'3rem'}}>404 Page Not Found</h1>
        <img src={NotFoundVector} alt="" />

      <p className={NotFoundStyles.text}>The page you requested cannot be displayed right now. It may be temporarily unavailable, the link you clicked on may be broken or expired, or you may not have permission to view this page.</p>
    </div>
  )
}

export default NotFound
