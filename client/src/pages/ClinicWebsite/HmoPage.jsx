import React from 'react'
import HeroGen from '../../components/Ui/HeroGen'
import hmoStyles from './HmoPage.module.css'
import HmoBg from '../../assets/hmoPartnerBg.png'

// Icons
import { MdOutlineMedicalInformation } from "react-icons/md";
import { MdAdsClick } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { TbHealthRecognition } from "react-icons/tb";

// HMO Logo directories
import Amaphil from '../../assets/hmo/amaphil.png';
import CaritasHealthShield from '../../assets/hmo/caritasHealthShield.png';
import CocoLife from '../../assets/hmo/cocoLife.png';
import EastWest from '../../assets/hmo/eastWest.png';
import FirstLife from '../../assets/hmo/firstLife.png';
import Hartmann from '../../assets/hmo/hartmann.png';
import Hmi from '../../assets/hmo/hmi.png';
import Hppi from '../../assets/hmo/hppi.png';
import ICare from '../../assets/hmo/iCare.png';
import MedAsia from '../../assets/hmo/medAsia.png';
import PacificCross from '../../assets/hmo/pacificCross.png';
import BpiPhilam from '../../assets/hmo/bpiPhilam.png';
import CoopHealth from '../../assets/hmo/coopHealth.png';
import Generali from '../../assets/hmo/generali.png';
import InLife from '../../assets/hmo/inLife.png';
import LacsonLacson from '../../assets/hmo/lacsonLacson.png';
import MediCard from '../../assets/hmo/mediCard.png';
import MediLink from '../../assets/hmo/mediLink.png';
import MedoCare from '../../assets/hmo/medoCare.png';
import PhilamLife from '../../assets/hmo/philamLife.png';
import SunLifeGrepa from '../../assets/hmo/sunLifeGrepa.png';
import ValuCare from '../../assets/hmo/valuCare.png';
import WellCare from '../../assets/hmo/wellCare.png';

const HmoPage = () => {

    const hmoProvider = [
        { Hmo: 'amaphil', src: Amaphil },
        { Hmo: 'caritasHealthShield', src: CaritasHealthShield },
        { Hmo: 'cocoLife', src: CocoLife },
        { Hmo: 'eastWest', src: EastWest },
        { Hmo: 'firstLife', src: FirstLife },
        { Hmo: 'hartmann', src: Hartmann },
        { Hmo: 'hmi', src: Hmi },
        { Hmo: 'hppi', src: Hppi },
        { Hmo: 'iCare', src: ICare },
        { Hmo: 'medAsia', src: MedAsia },
        { Hmo: 'pacificCross', src: PacificCross },
        { Hmo: 'bpiPhilam', src: BpiPhilam },
        { Hmo: 'coopHealth', src: CoopHealth },
        { Hmo: 'generali', src: Generali },
        { Hmo: 'inLife', src: InLife },
        { Hmo: 'lacsonLacson', src: LacsonLacson },
        { Hmo: 'mediCard', src: MediCard },
        { Hmo: 'mediLink', src: MediLink },
        { Hmo: 'medoCare', src: MedoCare },
        { Hmo: 'philamLife', src: PhilamLife },
        { Hmo: 'sunLifeGrepa', src: SunLifeGrepa },
        { Hmo: 'valuCare', src: ValuCare },
        { Hmo: 'wellCare', src: WellCare }
    ]

    const circleGen = () =>{
        
    }

  return (
    <div>
        <section className={hmoStyles.sectionOne}>

            <HeroGen bgSrc={HmoBg} header='Our HMO Partners'><p>We Accept 23 HMO Partners — Hassle-Free Healthcare, Just for You</p></HeroGen>
      
            <div className={hmoStyles.HmoInstructionsContainer}>
                <h1 className={hmoStyles.HmoTitle}>How It Works!</h1>
                <p className={hmoStyles.HmoSubtitle}>We’ve made the process simple for you. Whether you’re a first-time patient or a returning one, using your HMO benefits at Accelerated Wellness and Pain Clinic is fast, easy, and stress-free.</p>
            </div>

            <div className={hmoStyles.stepContainer}>

                <div className={hmoStyles.stepSubContainer}>
                    <div className={hmoStyles.stepIconContainer}>
                        <MdOutlineMedicalInformation className={hmoStyles.stepIcon}/>

                        <div className={hmoStyles.stepNumber}>1</div>
                    </div>
                    <div className={hmoStyles.stepText}>
                        <h3 className={hmoStyles.stepTitle}>Prepare</h3>
                        <p className={hmoStyles.stepSubtitle}>Bring your HMO card and valid ID when you visit any of our branches.</p>
                    </div>
                </div>

                <div className={hmoStyles.stepCircleContainer}>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                </div>

                <div className={hmoStyles.stepSubContainer}>
                    <div className={hmoStyles.stepIconContainer}>
                        <MdAdsClick className={hmoStyles.stepIcon}/>
                        <div className={hmoStyles.stepNumber}>2</div>
                    </div>
                    <div className={hmoStyles.stepText}>
                        <h3 className={hmoStyles.stepTitle}>Choose</h3>
                        <p className={hmoStyles.stepSubtitle}>Select your preferred clinic location through our online booking system or walk-in.</p>
                    </div>
                </div>

                <div className={hmoStyles.stepCircleContainer}>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                </div>

                <div className={hmoStyles.stepSubContainer}>
                    <div className={hmoStyles.stepIconContainer}>
                        <MdVerified className={hmoStyles.stepIcon}/>
                        <div className={hmoStyles.stepNumber}>3</div>
                    </div>
                    <div className={hmoStyles.stepText}>
                        <h3 className={hmoStyles.stepTitle}>Get Verified</h3>
                        <p className={hmoStyles.stepSubtitle}>Our front desk will verify and process your HMO coverage—fast and easy!</p>
                    </div>
                </div>

                <div className={hmoStyles.stepCircleContainer}>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                    <div className={hmoStyles.stepCircle}></div>
                </div>

                <div className={hmoStyles.stepSubContainer}>
                    <div className={hmoStyles.stepIconContainer}>
                        <TbHealthRecognition className={hmoStyles.stepIcon}/>
                        <div className={hmoStyles.stepNumber}>4</div>
                    </div>
                    <div className={hmoStyles.stepText}>
                        <h3 className={hmoStyles.stepTitle}>Start Healing</h3>
                        <p className={hmoStyles.stepSubtitle}>Enjoy personalized care from our expert team—no surprise expenses.</p>
                    </div>
                </div>

            </div>
        </section>

        <section className={hmoStyles.sectionTwo}>
            <h1 className={hmoStyles.hmoTitle}>Partnered HMOs include:</h1>

            <div className={hmoStyles.hmoContainer}>
                {hmoProvider.map((item)=>(
                    <div className={hmoStyles.hmoItem}>
                        <img  src={item.src} alt="" />
                    </div>

                ))}
                
            </div>

        </section>
    </div>
  )
}

export default HmoPage
