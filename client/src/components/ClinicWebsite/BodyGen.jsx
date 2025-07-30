import React from 'react'
import './Body.css'

const BodyGen = ({children, title}) => {
  return (
    <>
      <h1 className='body-gen-title'>{title}</h1>
      <p>{children}</p>
    </>
  )
}

export default BodyGen
