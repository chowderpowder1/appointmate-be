import React from 'react'
import './HeroGen.css'

const HeroGen = ({children, header, bgSrc}) => {
  return (
    <section className='about-hero'>
        <h1 className='hero-header'>{header}</h1>
        <div className='hero-body'>{children}</div>
        <div className='image-gradient'></div>
        <img src={ bgSrc } className='about-image' alt="Image" />
    </section>
  )
}

export default HeroGen
