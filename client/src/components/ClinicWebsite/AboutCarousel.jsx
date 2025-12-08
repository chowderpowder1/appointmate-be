import React from 'react'
import AboutCarouselStyles from './AboutCarousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselBg from '../../assets/about-carousel-background.png'
import caloocanBranch from '../../assets/branches/awCaloocan.jpeg'
import lagunaBranch from '../../assets/branches/awLagunajpeg.jpeg'
import antipoloBranch from '../../assets/branches/awAntipolo.jpeg'
import zabarteBranch from '../../assets/AwZabarte.jpg'
import valBranch from '../../assets/AwValenzuela.jpg'
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import 'swiper/css';
import clsx from 'clsx';

const AboutCarousel = () => {
  return (
    <div className={AboutCarouselStyles['about-carousel-container']}>
      <div className={AboutCarouselStyles['about-carousel-background']}>
        <h1 className={AboutCarouselStyles['about-carousel-title']}>
          Find a Clinic Near You
        </h1>
        <p className={AboutCarouselStyles['about-carousel-text']}>
          With 10 branches across the Philippines, quality care is always within reach. Check our locations and visit the nearest Accelerated Wellness and Pain Clinic today.
        </p>
      </div>

    <div className={AboutCarouselStyles['about-carousel-slides']}>
          <Swiper className={AboutCarouselStyles['swiper']}
            spaceBetween={40}            
            // loop={true}
            slidesPerView={4}
            grabCursor={true}
          >
              <SwiperSlide className={AboutCarouselStyles['swiper-slide']}>
                  <div className={AboutCarouselStyles["about-carousel-image-container"]}>
                    <img src={zabarteBranch} className={AboutCarouselStyles['about-carousel-image']}
                    alt="" />
                  </div>
                  <div className={AboutCarouselStyles["about-slide-text-container"]}>
                    <h1 className={AboutCarouselStyles['slide-title']}>
                      Zabarte
                    </h1>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaClock className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-clock-icon'])}/> 
                      <p>
                        8:00 am to 5:00 pm | M-T-W-S-S
                      </p>
                    </div>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaLocationDot className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-location-icon'])}/> 
                      <p>
                        JDC Building Block 5 Lot 9 Zabarte Road, Hobart Village, Barangay Kaligayahan, Quezon City
                      </p>
                    </div>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaPhoneAlt className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-phone-icon'])}/> 
                      <p>0906 168 3226 | 0981 263 3658</p>
                    </div>
                  </div>
              </SwiperSlide>
              <SwiperSlide className={AboutCarouselStyles['swiper-slide']}>
                  <div className={AboutCarouselStyles["about-carousel-image-container"]}>
                    <img src={lagunaBranch} className={AboutCarouselStyles['about-carousel-image']}
                    alt="" />
                  </div>
                  <div className={AboutCarouselStyles["about-slide-text-container"]}>
                    <h1 className={AboutCarouselStyles['slide-title']}>
                      Caloocan
                    </h1>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaClock className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-clock-icon'])}/> 
                      <p>
                        8:00 am to 5:00 pm | M-T-W-S-S
                      </p>
                    </div>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaLocationDot className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-location-icon'])}/> 
                      <p>
                        JDC Building Block 5 Lot 9 Zabarte Road, Hobart Village, Barangay Kaligayahan, Quezon City
                      </p>
                    </div>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaPhoneAlt className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-phone-icon'])}/> 
                      <p>0906 168 3226 | 0981 263 3658</p>
                    </div>
                  </div>
              </SwiperSlide>
              <SwiperSlide className={AboutCarouselStyles['swiper-slide']}>
                  <div className={AboutCarouselStyles["about-carousel-image-container"]}>
                    <img src={antipoloBranch} className={AboutCarouselStyles['about-carousel-image']}
                    alt="" />
                  </div>
                  <div className={AboutCarouselStyles["about-slide-text-container"]}>
                    <h1 className={AboutCarouselStyles['slide-title']}>
                      Antipolo
                    </h1>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaClock className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-clock-icon'])}/> 
                      <p>
                        8:00 am to 5:00 pm | M-T-W-S-S
                      </p>
                    </div>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaLocationDot className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-location-icon'])}/> 
                      <p>
                        JDC Building Block 5 Lot 9 Zabarte Road, Hobart Village, Barangay Kaligayahan, Quezon City
                      </p>
                    </div>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaPhoneAlt className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-phone-icon'])}/> 
                      <p>0906 168 3226 | 0981 263 3658</p>
                    </div>
                  </div>
              </SwiperSlide>
           
              <SwiperSlide className={AboutCarouselStyles['swiper-slide']}>
                  <div className={AboutCarouselStyles["about-carousel-image-container"]}>
                    <img src={caloocanBranch} className={AboutCarouselStyles['about-carousel-image']}
                    alt="" />
                  </div>
                  <div className={AboutCarouselStyles["about-slide-text-container"]}>
                    <h1 className={AboutCarouselStyles['slide-title']}>
                      Laguna
                    </h1>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaClock className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-clock-icon'])}/> 
                      <p>
                        8:00 am to 5:00 pm | M-T-W-S-S
                      </p>
                    </div>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaLocationDot className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-location-icon'])}/> 
                      <p>
                        JDC Building Block 5 Lot 9 Zabarte Road, Hobart Village, Barangay Kaligayahan, Quezon City
                      </p>
                    </div>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaPhoneAlt className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-phone-icon'])}/> 
                      <p>0906 168 3226 | 0981 263 3658</p>
                    </div>
                  </div>
              </SwiperSlide>
              <SwiperSlide className={AboutCarouselStyles['swiper-slide']}>
                  <div className={AboutCarouselStyles["about-carousel-image-container"]}>
                    <img src={valBranch} className={AboutCarouselStyles['about-carousel-image']}
                    alt="" />
                  </div>
                  <div className={AboutCarouselStyles["about-slide-text-container"]}>
                    <h1 className={AboutCarouselStyles['slide-title']}>
                      Zabarte
                    </h1>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaClock className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-clock-icon'])}/> 
                      <p>
                        8:00 am to 5:00 pm | M-T-W-S-S
                      </p>
                    </div>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaLocationDot className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-location-icon'])}/> 
                      <p>
                        JDC Building Block 5 Lot 9 Zabarte Road, Hobart Village, Barangay Kaligayahan, Quezon City
                      </p>
                    </div>
                    <div className={AboutCarouselStyles["ca"]}>
                      <FaPhoneAlt className={clsx(AboutCarouselStyles['slide-icon'], AboutCarouselStyles['about-phone-icon'])}/> 
                      <p>0906 168 3226 | 0981 263 3658</p>
                    </div>
                  </div>
              </SwiperSlide>
           
          </Swiper>
        </div>
    

    </div>
  )
}

export default AboutCarousel
