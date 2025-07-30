import React from 'react'
import './RedHeader.css'

const RedHeader = ({title}) => {
  return (
    <div className='red-header-container'>
      <h4>{title}</h4>
    </div>
  )
}

export default RedHeader
