import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectCards, Navigation, Autoplay} from 'swiper/modules';
import 'swiper/css';
import { FaStar } from "react-icons/fa";
import CarouselStyles from './Carousel.module.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { GiSevenPointedStar } from "react-icons/gi";

export default () => {

    const review = [
        {
            patientName:"Mary Rose Mercado",
            branch:"E. Rodriguez QC Branch",
            patientReview:"I'm glad I found this clinic near my house. Btw, they also have a lot of accredited HMOs that you can use for their service",
            rating:5
        },
        {
            patientName:"Josh Maruya",
            branch:"Zabarte QC Branch",
            patientReview:"Very satisfied",
            rating:5
        },
        {
            patientName:"Josh Maruya",
            branch:"Zabarte QC Branch",
            patientReview:"Very satisfied",
            rating:5
        },
        {
            patientName:"Josh Maruya",
            branch:"Zabarte QC Branch",
            patientReview:"Very satisfied",
            rating:5
        }
    ]
  return (
    <div className={CarouselStyles.carouselReviewContainer}>
    <Swiper
        modules={[Navigation, EffectCards, Autoplay]}
        effect={"cards"} 
        cardsEffect={{
            slideShadows:false,
            perSlideRotate: 1,
            rotate: true,
            perSlideOffset: 7
        }}
        initialSlide={0}
        navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev'
        }}
        autoplay={{delay:3000, disableOnInteraction:false}}
        spaceBetween={500}
        // loop={true}
        slidesPerView={1.10}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
    >
        {review.map((slide, index)=>(

            <SwiperSlide className={CarouselStyles.carouselSlide} key={index}>
                <p className={CarouselStyles.patientReview}>
                    "{slide.patientReview}"
                </p> 
                <div className={CarouselStyles.patientInfo}>
                    <div className={CarouselStyles.patientInfoSubContainer}>
                        <div className={CarouselStyles.patientProfile}>
                            <div className={CarouselStyles.patientIndicator}>
                                <GiSevenPointedStar className={CarouselStyles.patientIndicatorIcon}/>
                            </div>
                        </div>
                        <div className={CarouselStyles.patientSubInfo}>
                            <p className={CarouselStyles.patientName}>
                                {slide.patientName}
                            </p>
                            <p className={CarouselStyles.patientBranch}>
                                {slide.branch}
                            </p>
                        </div>
                    </div>
                    <p className={CarouselStyles.patientRating}>
                        <FaStar className={CarouselStyles.star} />
                        <FaStar className={CarouselStyles.star}/>
                        <FaStar className={CarouselStyles.star}/>
                        <FaStar className={CarouselStyles.star}/>
                        <FaStar className={CarouselStyles.star}/>
                        </p>
                </div>
            </SwiperSlide>
        ))}
    </Swiper>
</div>
  );
};