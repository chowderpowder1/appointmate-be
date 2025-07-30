import { Link } from 'react-router'
import { useState } from 'react'
import LoginStyles from './WelcomePage.module.css'
import '../ClinicWebsite/SwiperStyles.css'
import AwLogo from '../../assets/aw-logo.png'
import LoginImageOne from '../../assets/loginImageOne.png';
import LoginImageTwo from '../../assets/loginImageTwo.png';
import LoginImageThree from '../../assets/loginImageThree.png';

//Swiper dependencies
import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

//Mui dependencies
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { IoIosArrowBack } from "react-icons/io";

const LoginPage = () => {

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = ( index ) => setToggleState(index);

    const loginSwiperData = [
        {
            title: 'Book Appointments Anytime!',
            subtitle: "Schedule your therapy sessions online—anytime, anywhere. It's fast, easy, and skips the waiting line.",
            src: LoginImageOne
        },
        {
            title: 'Personalized Treatment Plans',
            subtitle: "Every patient is unique. Our expert team tailors therapy plans to match your specific condition, goals, and progress.",
            src: LoginImageTwo
        },
        {
            title: 'Seamless Medical Records',
            subtitle: 'Access your treatment history, progress notes, and appointments—all in one secure, digital platform.',
            src: LoginImageThree
        }
    ]

    return (
        
        <div className={LoginStyles.loginContainer}>
            
          <div className={LoginStyles.containerOne}>
        
            <Swiper className={LoginStyles.loginSwiper}
                modules={[Pagination, Autoplay]}
                pagination={{
                    el: '.myPagination',
                    clickable: true             
                }}
                autoplay={{delay:3000, disableOnInteraction:false}}
                spaceBetween={10}
                slidesPerView={1}
                grabCursor={true}
                onSwiper={(swiper) => {
                    swiper.params.pagination.el = '.myPagination';
                    swiper.pagination.init();
                    swiper.pagination.render();	
                    swiper.pagination.update();
                }}
            >
               { loginSwiperData.map((slide, index) =>(
                    <SwiperSlide className={LoginStyles.loginSlide}>
                    <div className={LoginStyles.loginSlideSubcontainer}>
                        <div className={LoginStyles.loginImageContainer}><img src={slide.src} alt="" /></div>   
                        <div className={LoginStyles.carouselTextContainer}>
                            <h1 className={LoginStyles.carouselTitle}>
                                {slide.title}
                            </h1>
                            <p className={LoginStyles.carouselSubtitle}>
                                {slide.subtitle}
                            </p>    
                        </div>
                    </div>
                </SwiperSlide>
               )
            )}              
            </Swiper>
            <div style={{width:'70%'}}  className={`myPagination ${LoginStyles.customPagination}`}>
            </div>
          </div>
<div className={LoginStyles.rightContainer}>
                
              <div className={ toggleState === 2 ? `${LoginStyles.containerThree} ${LoginStyles.activeContainer}`: `${LoginStyles.containerThree}`}>
                <button className={LoginStyles.loginBackBtn} onClick={()=>toggleTab(1)}><IoIosArrowBack className={LoginStyles.backIcon}/></button>
                <div className={LoginStyles.loginLogoContainer}>
                    <img className={LoginStyles.loginLogo} src={AwLogo} alt="" />
                </div>
                <div className={LoginStyles.loginTextContainer}>
                    <h1>Welcome</h1>
                    <p>Login to book therapy sessions, track your progress, and connect with your care provider.</p>
                </div>
                <div className={LoginStyles.loginFormsContainer}>
    
                     <Box
                     sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:4,
                        marginTop:2,
                     }}
                     component="form">
                         <TextField id="outlined-basic" label="Email" variant="outlined" />
    
                         <TextField id="outlined-basic" label="Password" variant="outlined" />
    
                        <div className={LoginStyles.loginQol}>
                        <form action="">
                            <input type="checkbox" id='rememberMe' name='rememberMe' />
                            <label htmlFor="rememberMe">Remember Me</label>
                        </form>
                        <Link>Forgot Password?</Link>
                     </div>
    
                        <Button variant="contained">Login</Button>
                     </Box>
    
                </div>
    
              </div>
    
              <div className={ toggleState === 1 ? `${LoginStyles.containerTwo} ${LoginStyles.activeContainer}`: `${LoginStyles.containerTwo}`}>

                <Link className={LoginStyles.homeBtn} to='/'>Home</Link>

                <div className={LoginStyles.loginLogoContainer}>
                    <img className={LoginStyles.loginLogo} src={AwLogo} alt="" />
                </div>
    
                <h1 className={LoginStyles.loginTitle}>
                    Your journey to wellness starts here!
                </h1>
                <p className={LoginStyles.loginSubtitle}>
                    Log in or Sign up to book your appointment. Access your schedule,   records, and more.
                </p>
    
                <button className={LoginStyles.loginBtn} onClick={() => toggleTab(2)}>
                    Login
                </button>
    
                <button className={LoginStyles.signUpBtn} onClick={() => toggleTab(3)}>
                    Sign Up
                </button>
              </div>
    
              <div className={ toggleState === 3 ? `${LoginStyles.containerFour} ${LoginStyles.activeContainer}`: `${LoginStyles.containerFour}`}>
                 <button className={LoginStyles.loginBackBtn} onClick={()=>toggleTab(1)}><IoIosArrowBack className={LoginStyles.backIcon}/></button>
                <div className={LoginStyles.loginLogoContainer}>
                    <img className={LoginStyles.loginLogo} src={AwLogo} alt="" />
                </div>
                <div className={LoginStyles.loginTextContainer}>
                    <h1>Create an account</h1>
                    <p>New here? Create an account to begin your journey to better health with Accelerated Wellness and Pain Clinic.</p>
                </div>
                <Box
                     sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:2,
                        marginTop:2,
                        width:'100%',
                        padding:0
                     }}
                     component="form">
                    <Box sx={{
                        display:'flex',
                        justifyContent:'space-between',
                        gap:3,
                        width:'100%',
                        padding:0
                     }}>
                             <TextField fullWidth
                             id="outlined-basic" label="First Name" variant="outlined" />
                             <TextField fullWidth id="outlined-basic" label="Last Name" variant="outlined" />
                         </Box>
    
                         <TextField id="outlined-basic" label="Email" variant="outlined" />
    
                         <TextField id="outlined-basic" label="Contact Number" variant="outlined" />
    
                         <TextField id="outlined-basic" label="Password" variant="outlined" type={'password'} />
    
                         <TextField id="outlined-basic" label="Confirm Password" variant="outlined" type={'password'} />
    
                        <div className={LoginStyles.loginQol}>
    
                     </div>
    
                        <Button sx={{padding:'1rem'}} variant="contained">Sign Up</Button>
                     </Box>
                    <p>Already have an account? Sign in here.</p>
    
              </div>
</div>
        </div>
  )
}

export default LoginPage
