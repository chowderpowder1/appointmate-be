import {React, useState, useEffect, CSSProperties } from 'react'
import { ClipLoader } from "react-spinners";
import resetStyles from './PasswordResetPage.module.css'
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSearchParams, Navigate, useNavigate, data } from "react-router";
import {useSubmitResetPassword, useGetToken} from '../../queries/auth.js'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PasswordResetPage = () => {
  const [searchParams] = useSearchParams();
  const [isValidToken, setIsValidToken] = useState(false);
  const token = searchParams.get("token");
  // return <Navigate to='/404' replace/>
  const { data: checkToken ,isLoading: checkTokenIsLoading, error: checkTokenTokenError } = useGetToken(token);
  
  console.log(checkToken)
  
  const {mutate: submitResetPasswordMutation} = useSubmitResetPassword();
  const [isPassword, setIsPassword] = useState({
    password:'',
    cpassword:'',
    // token: token,
  })

  const [passwordError, setPasswordError] = useState(null);
  const [passwordHelperText, setPasswordHelperText] = useState(null);
  const [cpasswordError, setcPasswordError] = useState(null);
  const [cpasswordHelperText, setcPasswordHelperText] = useState(null);
   const isValidPassword= (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)

   const passwordHandler = (e) =>{
    setIsPassword({
      ...isPassword,
       [e.target.name]: e.target.value
    })
   }

   const submitNewPassword = (e) => {
      e.preventDefault();
      submitResetPasswordMutation(isPassword,{
        onSuccess: (data) => {
          if (data.success){
            setIsPassword({
              password:'',
              cpassword:'',

            })           
            toast.success(data.message || 'Password reset successful')
            return <Navigate to='/login' replace/>
          }
         else{
          toast.error(data.message || 'Failed to reset password')
        }
        },
          onError:(error)=>{
            toast.error( data?.message ||
            'Server Error. Please try again.'
          )
        }
      });
   }
    const cpasswordMatch = (e) => {
        const passwordVal = e.target.value;
        console.log(e.target.value)
        if(isPassword.password != passwordVal ){
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
        console.log(e.target.value)

        if(isPassword.cpassword != passwordVal ){

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
      if (checkTokenIsLoading) {return <div style={{display:'flex', justifyContent:'center', padding:'5rem 0'}}><ClipLoader
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /></div>}
    if(!checkTokenIsLoading && !checkToken?.isValid){
      console.log(isValidToken)
      return <Navigate to='/expired-link' replace/>
    }

  return (
    <div className={resetStyles.mainContainer}>
      {/* <ClipLoader
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      /> */}
      <h1 style={{color:'#1565C0', }}>Set New Password</h1>
      <p>Enter your new password below. Make sure it’s strong and secure.</p>

         <form className={resetStyles.formContainer} onSubmit={submitNewPassword}>
           <TextField
            onChange={(e)=>{
                passwordHandler(e)
                passwordMatch(e)
            }}
            id="outlined-basic"
            name="password"
            value={isPassword.password}
            label="Password"
            variant="outlined"
            type={'password'}
            required
            fullWidth
            error={passwordError}
            helperText={passwordHelperText}/>
                 
                  <TextField
            onChange={(e)=>{
                passwordHandler(e)
                cpasswordMatch(e)
            }}
            id="outlined-basic"
            fullWidth
            label="Confirm Password"
            name="cpassword"
            value={isPassword.cpassword}
            variant="outlined"
            type={'password'}
            required
            error={cpasswordError}
            helperText={cpasswordHelperText}
                 />
               
           
                 <Button
                   type="submit"
                   variant="contained"
                   sx={{
                    width:'fit-content',
                    margin:'auto',
                    marginTop:'1rem'            
                   }}
                 >
                   Set New Password
                 </Button>
         </form>
        <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
    </div>
  )
}

export default PasswordResetPage
