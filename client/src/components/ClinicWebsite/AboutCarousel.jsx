import React from 'react'
import AboutCarouselStyles from './AboutCarousel.module.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselBg from '../../assets/about-carousel-background.png'
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
            slidesPerView={3.5}
            grabCursor={true}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
              <SwiperSlide className={AboutCarouselStyles['swiper-slide']}>
                  <div className={AboutCarouselStyles["about-carousel-image-container"]}>
                    <img src={CarouselBg} className={AboutCarouselStyles['about-carousel-image']}
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
                    <img src={CarouselBg} className={AboutCarouselStyles['about-carousel-image']}
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
                    <img src={CarouselBg} className={AboutCarouselStyles['about-carousel-image']}
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
                    <img src={CarouselBg} className={AboutCarouselStyles['about-carousel-image']}
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
