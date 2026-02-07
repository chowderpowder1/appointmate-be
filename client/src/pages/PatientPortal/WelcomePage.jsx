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
import FormControl from '@mui/material/FormControl';

import axios from "axios";
import Alert from '@mui/material/Alert';

import { GoogleLogin } from '@react-oauth/google';
import { ToastContainer, toast } from 'react-toastify';

import Modal from '../../components/Ui/Modal'
import { styled } from '@mui/material'
import dayjs from "dayjs";

import { useGenerateOtp } from '../../queries/users.js'
import { useSubmitLogin, useSubmitOtp, useSubmitResetEmail } from '../../queries/auth.js'

const LoginPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: submitLoginMutation} = useSubmitLogin();
    const { mutate: submitResetEmailMutation} = useSubmitResetEmail();
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
    const [isChecked, setIsChecked] = useState(false);
    const [otpPayLoad, setOtpPayLoad] = useState({
        otp: '',
        email:'',
        password:"",
    });

    const [isResetEmail, setResetEmail] = useState({
        email:'',
    });

    const handleResetEmailSubmit = (e) =>{
        e.preventDefault()
        submitResetEmailMutation(isResetEmail)
        setResetEmail({
            ...isResetEmail,
            email:'',
        })
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const [signUpForm, setsignUpForm] = useState({
        first_name:"",
        last_name:"",
        middle_name:"",
        contact_number:"",
        email:"",
        password:"",
        cpassword:"",
    })

    const [loginForm, setLoginForm] = useState({
        otp: '',
        email:"",
        password:"",
    })

    const otpHandler = (e) => {
        setOtpPayLoad((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const isValidPassword= (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
    const cpasswordMatch = (e) => {
        const passwordVal = e.target.value;

        if(signUpForm.cpassword != passwordVal ){
            console.log('Passord does not match')
            setcPasswordError(true)
            setcPasswordHelperText('Password Does not Match')
        } else if (!isValidPassword(passwordVal)){
            setcPasswordError(true)
            setcPasswordHelperText(`Make sure your password is at least 8 characters, one lowercase letter, one uppercase letter, one number, one special character (@$!%*?&)`)
        } 
        else{
            console.log('Password Match')
            setcPasswordError(false)
            setcPasswordHelperText('Password Match')
        }
    }

    const passwordMatch = (e) => {
        const passwordVal = e.target.value;

        if(signUpForm.password != passwordVal ){

            console.log('Passord does not match')
            setcPasswordError(true)
            setcPasswordHelperText('Password Does not Match')
        }  else if (!isValidPassword(passwordVal)){
            setcPasswordError(true)
            setcPasswordHelperText(`Make sure your password is at least 8 characters, one lowercase letter, one uppercase letter, one number, one special character (@$!%*?&)`)
        } else if (signUpForm.password == passwordVal){
            console.log('Password Match')
            setcPasswordError(false)
            setcPasswordHelperText('Password Match')
        }
    }
    const handleOtpSubmit = (e) => {
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
                    console.log(res.data.message)
                    toast(res.data.message)
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
        console.log(loginForm)
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
        console.log(loginForm)
        e.preventDefault();
        submitLoginMutation(loginForm, {
            onSuccess: (data) => {
                console.log('success', data.requireOtp)
                setIsVerified(data.requireOtp)
                if(data.gmailAccount){
                    toast('Gmail Account: Please Sign in with Google')  
                }
                 if (data.redirectTo) {
        window.location.href = data.redirectTo; // ✅ correct client redirect
      }   
            }
        })
            // try{
            //     const res = await axios.post(
            //         'http://localhost:8080/auth/login', 
            //         loginForm,
            //         { withCredentials: true }
            //     )
            //     .then(res => {
            //         if (res.status===200 && res.data.redirectTo){
            //             toast('Login Successful. Redirecting to login page')
            //             setTimeout(()=>{
            //                 window.location.href = res.data.redirectTo;
            //             }, '1000')
            //         }
            //     })
                    
            //         redirect("/");
            // } catch (error) 
            
                
                // console.error('Error:', error);
    
                // notify((error.response.data).toString())

            
            // setLoginForm({
            //             email:'',
            //             password:'',
            //         })
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
             onSubmit={handleLoginSubmit}
             >
                 <TextField
                 onChange={handleLoginChange} 
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
                    width:'100%',
                    margin:'auto',
                    
                             }}
                 />
                             <Button type='submit' variant="contained"
                             sx={{
                                marginTop:'1rem',
                    width:'100%',
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
                           <Button type='submit' sx={{
                            backgroundColor:'var(-primary-contrast)',
                            height:'50px',
                            padding:'.5rem 4rem',
                            borderRadius:'10px',
                        }}
                        
                        variant="contained"><Link to='' 
                        style={{color:'white', 
                            fontWeight:'400', 
                            fontSize:'1.1rem', 
                            textTransform:'none',
                            
                        }}
                        >Login</Link></Button>
                        <div className={LoginStyles.loginQol}>
                        <p style={{cursor:'pointer', marginLeft:'auto', color:'blue'}} onClick={()=>toggleTab(4)}>Forgot Password?</p>          
                        
                                                                  
                     </div>

 
                  
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
                                    variant='contained' className={LoginStyles.loginBtn} 
                                    
                                    onClick={() => toggleTab(3)}>
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
                    
                     <TextField onChange={handleSignUpChange} 
                     fullWidth
                     id="outlined-basic" 
                     name="first_name" 
                     label="First Name" 
                     variant="outlined" 
                     required/>
                                            
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
                             name="middle_name" 
                             label="M.I." 
                             variant="outlined" 
                             slotProps={{ 
                                htmlInput:{maxLength: 1}
                            }}
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
                        <FormControl required>
                          <FormGroup>
                            <FormControlLabel
                              sx={{
                                alignItems: 'flex-start',
                                textAlign: 'none',
                              }}
                              control={
                                <Checkbox 
                                  checked={isChecked}
                                  onChange={(e) => setIsChecked(e.target.checked)}
                                  onClick={() => setIsOpen(true)}
                                />
                              } 
                              label={
                                <span>
                                  By proceeding, I confirm that I have read, understood, and accepted the{' '}
                                  <span 
                                    onClick={() => setIsOpen(true)}
                                    style={{ color: '#1976d2', cursor: 'pointer', textDecoration: 'underline' }}
                                  >
                                    Terms and Conditions
                                  </span>.
                                </span>
                              }
                            />
                          </FormGroup>

                        </FormControl>
                        
                            <Button sx={{
                                width:'70%',
                                height:'50px',
                                margin:'auto',
                                fontWeight:500,
                                fontSize:'1.1rem',
                                textTransform:'none'
                            }} variant="contained" type="submit" 
                            disabled={!isChecked || cpasswordError}
                            >Sign Up</Button>
                                                 </Box>
                        
                    <p style={{marginTop:'1rem', color:'var(--off-black)'}}>Already have an account? <p className={LoginStyles.noAccRegLinkText} onClick={()=>toggleTab(2)}>Sign in here.</p></p>
    
              </div>
            
            <div className={ toggleState === 4 ? `${LoginStyles.containerFive} ${LoginStyles.activeContainer}`: `${LoginStyles.containerFive}`}>
                <button className={LoginStyles.loginBackBtn} onClick={()=>toggleTab(1)}><IoIosArrowBack className={LoginStyles.backIcon}/></button>


                <div className={LoginStyles.resetPwdContainer}>
                    <Link to='/admin' className={LoginStyles.loginLogoContainer}>
                        <img className={LoginStyles.loginLogo} src={AwLogo} alt="" />
                    </Link>
                    <h1
                    className={LoginStyles.header}>Forgot your password?</h1>
                    <p style={{textAlign:'left'}}>Enter the email address associated with your account and we’ll send you a link to reset your password.</p>
                    <form className={LoginStyles.resetFormContainer} onSubmit={handleResetEmailSubmit}>
    
                        <TextField
                        fullWidth
                          label="Email"
                          variant="outlined"
                          error={emailError}
                          helperText={emailHelperText}
                          sx={{
                            
                          }}
                          value={isResetEmail.email}
                          onChange={(e)=> {
                            handleEmailChange(e)
                            setResetEmail({
                                ...isResetEmail,
                                email: e.target.value})}}
                        />
                        <Button sx={{
                            width:'fit-content',
                            height:'50px',
                            // margin:'auto',
                            borderRadius:'10px',
                            fontWeight:500,
                            fontSize:'1.1rem',
                            marginLeft:'auto',
                            textTransform:'none'
                        }} variant="contained" type="submit"
                        // disabled={!isChecked || cpasswordError}
                        >Send Reset Link</Button>
                    </form>
                </div>                
            </div>
</div>
            <Modal open={isOpen}  onClose={() => setIsOpen(false)}>
             
<div className={LoginStyles.tosContainer}>
  <h1>Terms and Conditions</h1>
    <p>Effective Date: {dayjs().format('dddd MMM YYYY')}</p>
  <p><strong>Welcome to AppointMate!</strong> By registering, accessing, or using our platform, you agree to comply with these Terms and Conditions. Please read them carefully.</p>

  <h2>1. Acceptance of Terms</h2>
  <p>By creating an account and using AppointMate, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
  <p>If you do not agree, you may not use the platform.</p>

  <h2>2. User Registration</h2>
  <p>You must provide accurate and complete information when creating an account.</p>
  <p>You are responsible for maintaining the confidentiality of your login credentials.</p>
  <p>Duplicate accounts are not allowed. Attempts to create multiple accounts may result in termination.</p>

  <h2>3. Use of AppointMate</h2>
  <p>AppointMate is intended to help users manage appointments efficiently.</p>
  <p>You agree to use the platform for lawful purposes only.</p>
  <p>You may not misuse, disrupt, or interfere with the platform's services or data.</p>

  <h2>4. User Responsibilities</h2>
  <p>You are responsible for all activity under your account.</p>
  <p>You agree not to share your account credentials with others.</p>
  <p>You must comply with all applicable laws and regulations while using AppointMate.</p>

  <h2>5. Privacy and Data</h2>
  <p>AppointMate collects and processes data according to our Privacy Policy.</p>
  <p>By using the platform, you consent to the collection, storage, and use of your data as described.</p>
  <p>We take reasonable measures to protect your data but cannot guarantee complete security.</p>

  <h2>6. Verification and Communication</h2>
  <p>Users may receive verification codes (OTP) for authentication purposes.</p>
  <p>You agree to provide a valid email or phone number to receive notifications.</p>

  <h2>7. Limitation of Liability</h2>
  <p>AppointMate is provided "as is." We do not guarantee uninterrupted or error-free service.</p>
  <p>We are not liable for any direct, indirect, or consequential damages arising from the use or inability to use the platform.</p>

  <h2>8. Termination</h2>
  <p>We may suspend or terminate accounts for violations of these Terms, suspicious activity, or at our discretion.</p>
  <p>Users may terminate their account at any time by following the in-app instructions.</p>

  <h2>9. Changes to Terms</h2>
  <p>AppointMate reserves the right to update or modify these Terms at any time.</p>
  <p>Users will be notified of significant changes through the platform or email. Continued use of AppointMate constitutes acceptance of the updated Terms.</p>

  <h2>10. Governing Law</h2>
  <p>These Terms are governed by the laws of the Philippines.</p>
  <p>Any disputes arising from these Terms shall be resolved in accordance with the governing law.</p>

  <div className={LoginStyles.tosBtnContainer}>
      <Button variant="contained" onClick={()=>{
        setIsOpen(false)
      }} > I understand </Button>

  </div>
</div>
            
            </Modal>
 <ToastContainer/>
        </div>
  )
}

export default LoginPage
