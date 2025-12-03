import { Link } from 'react-router'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import LoginStyles from './WelcomePage.module.css'

import '../ClinicWebsite/SwiperStyles.css'
import AwLogo from '../../assets/aw-logo.png'
import LoginImageOne from '../../assets/loginImageOne.png';
import LoginImageTwo from '../../assets/loginImageTwo.png';
import LoginImageThree from '../../assets/loginImageThree.png';
import googleSignIn from '../../assets/googleSignIn.png'
import fbSignIn from '../../assets/fbSignIn.png'

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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import axios from "axios";
import Alert from '@mui/material/Alert';

import { GoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const redirect = useNavigate();
    const toggleTab = ( index ) => setToggleState(index);
    const [toggleState, setToggleState] = useState(1);

    const [signUpForm, setsignUpForm] = useState({
        first_name:"",
        last_name:"",
        contact_number:"",
        email:"",
        password:"",
    })

    const [loginForm, setLoginForm] = useState({
        email:"",
        password:"",
    })

    const handleSignUpChange = (e) => {
      setsignUpForm({
        ...signUpForm,
        [e.target.name]: e.target.value,
      });
    };

    const handleSignUpSubmit = async (e) =>{
        e.preventDefault();
            try{
                const response = await axios.post(
                    'http://localhost:8080/auth/signup', 
                    signUpForm
                )
                redirect("/");
                
            console.log('Response:', response.data);
            } catch (error) 
            {
                console.error('Error:', error);
            }
    }

    const handleLoginChange = (e) => {
      setLoginForm({
        ...loginForm,
        [e.target.name]: e.target.value,
      });
    };

    const handleLoginSubmit = async (e) =>{
        e.preventDefault();
            try{
                const res = await axios.post(
                    'http://localhost:8080/auth/login', 
                    loginForm,
                    { withCredentials: true }
                ).then(res => {
                    if (res.status===200 && res.data.redirectTo){
                        window.location.href = res.data.redirectTo;
                    }
                })
                    redirect("/");
            } catch (error) 
            {
                console.error('Error:', error);
            }
    }

    const handleGoogleLogin = async(credentialResponse) => {

        try{
            const res = await axios.get("http://localhost:8080/auth/google/callback", credentialResponse.credential, {withCredentials: true})

            if (!res.ok) {
              const errData = await res.json();
              console.error("Login failed:", errData.error);
              return;
            }
        
            const data = await res.json();
            console.log("Logged in user:", data);
        } catch (err){
            console.error("Login error: ", err);
        }
    }
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
                <Link to='/admin' className={LoginStyles.loginLogoContainer}>
                    <img className={LoginStyles.loginLogo} src={AwLogo} alt="" />
                </Link>
                <div className={LoginStyles.loginTextContainer}>
                    <h1 className={LoginStyles.header}>Welcome</h1>
                    <p className={LoginStyles.headerSubText}>Login to book therapy sessions, track your progress, and connect with your care provider.</p>
                </div>
                <div className={LoginStyles.loginFormsContainer}>
                    
                     <Box method='POST' onSubmit={handleLoginSubmit}
                     sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:4,
                        marginTop:2,
                     }}
                     component="form">
                         <TextField onChange={handleLoginChange} name='email' id="outlined-basic" label="Email" variant="outlined" type="email"/>
    
                         <TextField onChange={handleLoginChange} name='password' id="outlined-basic" label="Password" variant="outlined" type="password"/>
    
                        <div className={LoginStyles.loginQol}>
                        <form action="POST">
                            <input type="checkbox" id='rememberMe' name='rememberMe' />
                            <label id={LoginStyles.rememberMeLabel} htmlFor="rememberMe">Remember Me</label>
                        </form>
                        <Link>Forgot Password?</Link>
                     </div>

                        <Button type='submit' sx={{
                            backgroundColor:'var(-primary-contrast)',
                            height:'50px'
                        }}
                        
                        variant="contained"><Link to='' style={{color:'white', fontWeight:'400', fontSize:'1.1rem', textTransform:'none'}}>Login</Link></Button>
                    
                     </Box>

                     <div className={LoginStyles.alternativeLoginTxtContainer}>
                         <div className={LoginStyles.line}></div>
                         <p>or continue using</p>
                         <div className={LoginStyles.line}></div>
                     </div>
             <div className={LoginStyles.alternativeLoginContainer}>
                        <div className={LoginStyles.alternativeLoginBtnContainer}>
                            {/* <GoogleLogin 
                            onSuccess={handleGoogleLogin}
                            onError={()=> console.log("Login Failed")}
                            
                                //    onSuccess={credentialResponse => {
                                //     console.log('Successful')
                                //      console.log(credentialResponse);
                                //    }}
                                //    onError={() => {
                                //      console.log('Login Failed');
                                //    }}
                                 /> */}
                         </div>
                         <div className={LoginStyles.alternativeLoginBtnContainer}>
                            <div className={LoginStyles.googleContainer}>
                                <a href="http://localhost:8080/auth/google">
                                  <button>Continue with Google</button>
                                </a>                            
                         </div>
                         {/* <div className={LoginStyles.alternativeLoginBtnContainer}>
                             <div className={LoginStyles.googleContainer}>
                                <img className={LoginStyles.googleSignIn} src={fbSignIn} alt="" />
                                <p>Sign in with Facebook</p>
                             </div> */}
                         </div>
                     </div>
                     <p>Don't have an Account? <p onClick={() => toggleTab(3)} className={LoginStyles.noAccRegLinkText}>Register Here</p></p>

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
    
                    <Button Button sx={{
                                    height:'50px',
                                    fontWeight:500,
                                    fontSize:'1.1rem',
                                    textTransform:'none',
                                    marginTop:'1rem',
                                    boxShadow:'none'

                    }}
                                    variant='contained' className={LoginStyles.loginBtn} onClick={() => toggleTab(2)}>
                        Login
                    </Button>
                    <Button Button sx={{
                                    height:'50px',
                                    fontWeight:500,
                                    fontSize:'1.1rem',
                                    textTransform:'none',
                                    backgroundColor:'white',
                                    border:'1px solid var(--primary-contrast)',
                                    color:'var(--primary-contrast)',
                                    marginTop:'1rem',
                                    boxShadow:'none'

                    }}
                                    variant='contained' className={LoginStyles.loginBtn} onClick={() => toggleTab(3)}>
                        SignUp
                    </Button>
    

              </div>
    
              <div className={ toggleState === 3 ? `${LoginStyles.containerFour} ${LoginStyles.activeContainer}`: `${LoginStyles.containerFour}`}>
                 <button className={LoginStyles.loginBackBtn} onClick={()=>toggleTab(1)}><IoIosArrowBack className={LoginStyles.backIcon}/></button>
                <div className={LoginStyles.loginLogoContainer}>
                    <img className={LoginStyles.loginLogo} src={AwLogo} alt="" />
                </div>
                <div className={LoginStyles.loginTextContainer}>
                    <h1 className={LoginStyles.header}>Create an account</h1>
                    <p >New here? Create an account to begin your journey to better health with Accelerated Wellness and Pain Clinic.</p>
                </div>
                <Box component='form' method='POST' onSubmit={handleSignUpSubmit}
                     sx={{
                        display:'flex',
                        flexDirection:'column',
                        gap:2,
                        marginTop:2,
                        width:'100%',
                        padding:0
                     }}
                     >
                    <Box sx={{
                        display:'flex',
                        justifyContent:'space-between',
                        gap:3,
                        width:'100%',
                        padding:0
                     }}>
                             <TextField onChange={handleSignUpChange} fullWidth
                             id="outlined-basic" name="first_name" label="First Name" variant="outlined" />
                             <TextField onChange={handleSignUpChange} fullWidth name="last_name" id="outlined-basic" label="Last Name" variant="outlined" />
                         </Box>
    
                         <TextField onChange={handleSignUpChange} id="outlined-basic" name="email" label="Email" variant="outlined" />
    
                         <TextField onChange={handleSignUpChange} id="outlined-basic" name="contact_number" label="Contact Number" variant="outlined" />
    
                         <TextField onChange={handleSignUpChange} id="outlined-basic" name="password" label="Password" variant="outlined" type={'password'} />
    
                         <TextField onChange={handleSignUpChange} id="outlined-basic" label="Confirm Password" variant="outlined" type={'password'} />
    
                        <div className={LoginStyles.loginQol}>
    
                     </div>
                        <FormGroup>
                        <FormControlLabel sx={{
                            alignItems:'flex-start',
                            textAlign:'none',
                        }}
                        control={<Checkbox defaultChecked />} label="By proceeding, I confirm that I have read, understood, and accepted the Terms and Conditions." />
                        </FormGroup>
                        
                            <Button sx={{
                                width:'70%',
                                height:'50px',
                                margin:'auto',
                                fontWeight:500,
                                fontSize:'1.1rem',
                                textTransform:'none'
                            }} variant="contained" type="submit" >Sign Up</Button>
                                                 </Box>
                        
                    <p style={{marginTop:'1rem', color:'var(--off-black)'}}>Already have an account? <p className={LoginStyles.noAccRegLinkText} onClick={()=>toggleTab(2)}>Sign in here.</p></p>
    
              </div>
</div>
        </div>
  )
}

export default LoginPage
