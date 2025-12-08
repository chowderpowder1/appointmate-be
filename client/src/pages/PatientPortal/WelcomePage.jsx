import { Link } from 'react-router'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import LoginStyles from './WelcomePage.module.css'

import '../ClinicWebsite/SwiperStyles.css'
import AwLogo from '../../assets/aw-logo.png'
import OtpLogo from '../../assets/OTP_LOGO.png'
import LoginImageOne from '../../assets/loginImageOne.png';
import LoginImageTwo from '../../assets/loginImageTwo.png';
import LoginImageThree from '../../assets/loginImageThree.png';
import GoogleIcon from '../../assets/GoogleIcon.png'
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
import { ToastContainer, toast } from 'react-toastify';

import Modal from '../../components/Ui/Modal'
import { styled } from '@mui/material'

import { useGenerateOtp } from '../../queries/users.js'
import { useSubmitLogin, useSubmitOtp } from '../../queries/auth.js'

const LoginPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: submitLoginMutation} = useSubmitLogin();
    const {mutate:generateOtpMutation} = useGenerateOtp();
    const {mutate:submitOtp} = useSubmitOtp();
    const [isOtpOpen, setIsOtpOpen] = useState(false);
    const redirect = useNavigate();
    const toggleTab = ( index ) => setToggleState(index);
    const [isVerified, setIsVerified] = useState();
    const [toggleState, setToggleState] = useState(1);
    const [emailError, setEmailError] = useState();
    const [emailHelperText, setEmailHelperText] = useState();
    const [contactNumberError, setContactNumberError] = useState();
    const [contactNumberHelperText, setContactNumberHelperText] = useState();
    const [passwordError, setPasswordError] = useState();
    const [passwordHelperText, setPasswordHelperText] = useState();
    const [cpasswordError, setcPasswordError] = useState();
    const [cpasswordHelperText, setcPasswordHelperText] = useState();
    const [otpPayLoad, setOtpPayLoad] = useState({
        otp: '',
        email:'',
    });
    
    const [signUpForm, setsignUpForm] = useState({
        first_name:"",
        last_name:"",
        contact_number:"",
        email:"",
        password:"",
        cpassword:"",
    })

    const [loginForm, setLoginForm] = useState({
        email:"",
        password:"",
    })

    const otpHandler = (e) => {
        setOtpPayLoad((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
        console.log(otpPayLoad)
    }

    const cpasswordMatch = (e) => {
        const passwordVal = e.target.value;

        if(signUpForm.cpassword != passwordVal ){

            console.log('Passord does not match')
            setcPasswordError(true)
            setcPasswordHelperText('Password Does not Match')
        } else{
            console.log('Password Match')
            setcPasswordError(false)
            setcPasswordHelperText('Password Match')
        }
    }

    const passwordMatch = (e) => {
        const passwordVal = e.target.value;

        if(signUpForm.password != passwordVal ){

            console.log('Passord does not match')
            setPasswordError(true)
            setPasswordHelperText('Password Does not Match')
        } else{
            console.log('Password Match')
            setPasswordError(false)
            setPasswordHelperText('Password Match')
        }
    }
    const handleOtpSubmit = (e) => {
        console.log(otpPayLoad)
        e.preventDefault()
        submitOtp(otpPayLoad, {
            onSuccess: (data) => {
                console.log('success', data.requireOtp)
                setIsVerified(data.requireOtp)
                if(!data.requireOtp){
                    toast('Email has been successfully verified')
                }   
z
            }
        })
    }

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    };

    const isValidContactNumber = (number) => {
        return /^(09|\+639)\d{9}$/.test(number);
    }

    const handleContactNumberChange = (e) =>{
        
        const contactNumber = e.target.value;
        console.log(contactNumber)

        if(!isValidContactNumber(contactNumber)){
            console.log('not valid contact Number')
            setContactNumberError(true)
            setContactNumberHelperText('Please Enter a valid contact number')
        } else{
            console.log('is valid contact number')
            setContactNumberError(false)
            setContactNumberHelperText('Valid contact number')
        }
    }

    const handleEmailChange = (e) =>{
        
        const email = e.target.value;
        console.log(email)

        if(!isValidEmail(email)){
            console.log('not valid email')
            setEmailError(true)
            setEmailHelperText('Please Enter a valid email address')
        } else{
            console.log('is valid email')
            setEmailError(false)
            setEmailHelperText('Valid Email')
        }
    }

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
                ).then(res => {
                    console.log(res)
                    toast('Account Successfully registered. Redirecting to login page')
                    delay(3000)
                    if (res.status===200 && res.data.redirectTo){
                        window.location.href = res.data.redirectTo;
                    }
                })
                
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
      setOtpPayLoad((prev) => ({
    ...prev,
    email: loginForm.email   // carry the email forward
  }));
        console.log(otpPayLoad)
    };

    const handleLoginSubmit = async (e) =>{
        e.preventDefault();
        submitLoginMutation(loginForm, {
            onSuccess: (data) => {
                console.log('success', data.requireOtp)
                setIsVerified(data.requireOtp)
                if(data.gmailAccount){
                    toast('Gmail Account: Please Sign in with Google')
                }   
            }
        })
        // generateOtpMutation(email);
            try{
                const res = await axios.post(
                    'http://localhost:8080/auth/login', 
                    loginForm,
                    { withCredentials: true }
                )
                .then(res => {
                    if (res.status===200 && res.data.redirectTo){
                        toast('Account Successfully registered. Redirecting to login page')
                        setTimeout(()=>{
                            window.location.href = res.data.redirectTo;
                        }, '1000')
                    }
                })
                    
                //     redirect("/");
            } catch (error) 
            {
                
                console.error('Error:', error);
    
                notify((error.response.data).toString())

            }
            setLoginForm({
                        email:'',
                        password:'',
                    })
    }

    const notify = (message) => toast(message);

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
        <Modal open={isVerified} onClose={() => setIsVerified(false)}>
            <div className={LoginStyles.otpContainer}>
            <div className={LoginStyles.otpLogoContainer}><img className={LoginStyles.otpLogo} src={OtpLogo} alt="" /></div>
            <h2>Enter verification code</h2>
            <p className={LoginStyles.otpDesc}>Please enter the code sent to your email or phone.</p>
             <form 
             onSubmit={handleOtpSubmit}
             >
                 <TextField
                 onChange={otpHandler} 
                              name='otp' 
                              required
                              
                            id="outlined-basic" 
                             //  label="Email"
                            variant="outlined" 
                             //  type="email"
                             //  value={loginForm.email}
                             //  onError={emailError}
                             //  helperText={emailHelperText}
                             slotProps={{ htmlInput: { maxLength: 6, style:{ textAlign: 'center'} } }}
                             sx={{
                    width:'70%',                          
                             }}
                 />
                             <Button type='submit' variant="contained"
                             sx={{
                    width:'70%',
                    backgroundColor:'var(-primary-contrast)',
                    height:'50px'
                             }}>Verify</Button>
             </form>
            </div>         
        </Modal>
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
                         <TextField 
                         onChange={
                            (e)=>{
                            const email = e.target.value
                            handleLoginChange(e)
                            handleEmailChange(e)
                        }} 
                         name='email' 
                         required
                         id="outlined-basic" 
                         label="Email" 
                         variant="outlined" 
                         type="email"
                         value={loginForm.email}
                         error={emailError}
                         helperText={emailHelperText}
                         
                         />
    
                         <TextField 
                         onChange={handleLoginChange} 
                         value={loginForm.password}
                         required
                         name='password' 
                         id="outlined-basic" 
                         label="Password" 
                         variant="outlined" 
                         type="password"/>
    
                        <div className={LoginStyles.loginQol}>

                        {/* <Link>Forgot Password?</Link> */}
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
                                <div className={LoginStyles.googleIconContainer}>
                                    <img className={LoginStyles.googleIcon} src={GoogleIcon} alt="" />
                                    </div>
                                  <button className={LoginStyles.googleContainerBtn}>
                                    Sign in with Google
                                </button>
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
                             <TextField onChange={handleSignUpChange} 
                             fullWidth
                             id="outlined-basic" 
                             name="first_name" 
                             label="First Name" 
                             variant="outlined" 
                             required/>
                             <TextField 
                             onChange={handleSignUpChange}

                             fullWidth 
                             name="last_name" 
                             id="outlined-basic" 
                             label="Last Name" 
                             variant="outlined" 
                             required/>
                         </Box>
    
                         <TextField 
                            onChange={(e)=>{
                                const emailVal = e.target.value
                                handleSignUpChange(e)
                                handleEmailChange(e)
                            }} 
                         id="outlined-basic" 
                         name="email" 
                         label="Email" 
                         variant="outlined" 
                         error={emailError}
                         helperText={emailHelperText}
                         required/>
    
                         <TextField 
                         onChange={(e)=>{
                            handleSignUpChange(e)
                            handleContactNumberChange(e)
                        }} 

                         id="outlined-basic" 
                         name="contact_number" 
                         label="Contact Number" 
                         variant="outlined"                         
                         required
                         error={contactNumberError}
                         helperText={contactNumberHelperText}
                         />
    
                         <TextField 
                            onChange={(e)=>{
                                handleSignUpChange(e)
                                cpasswordMatch(e)
                            }} 
                            id="outlined-basic" 
                            name="password" 
                            value={signUpForm.password}
                            label="Password" 
                            variant="outlined" 
                            type={'password'} 
                            required
                            error={passwordError}
                            helperText={passwordHelperText}
                         />
    
                         <TextField 
                            onChange={(e)=>{
                                handleSignUpChange(e)
                                passwordMatch(e)
                            }} 
                            id="outlined-basic" 
                            label="Confirm Password" 
                            name="cpassword" 
                            value={signUpForm.cpassword}
                            variant="outlined" 
                            type={'password'} 
                            required
                            error={cpasswordError}
                            helperText={cpasswordHelperText}
                        />
    
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
 <ToastContainer />
        </div>
  )
}

export default LoginPage
