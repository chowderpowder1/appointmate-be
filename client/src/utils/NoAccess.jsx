import {React, useEffect, useState} from 'react'
import AccessStyles from './NoAccessStyles.module.css'
import {Link, Navigate} from 'react-router'
import unauthorizedVector from './unauthorized.png'
import { ClipLoader } from "react-spinners";

const NoAccess = ({title, message}) => {
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setRedirect(true);
        },2000)

        return () => clearTimeout((timer))
    }, [])

    if(redirect){
        return <Navigate to='/' replace/>
    }
  return (
    <div className={AccessStyles.container}>
        <div className={AccessStyles.vectorContainer}>
            <img className={AccessStyles.vector} src={unauthorizedVector} alt="" />
        </div>
        <ClipLoader size={80} />;
      <h1 className={AccessStyles.header}>{title}</h1>
      <p className={AccessStyles.body}>{message}</p>
    
      <p className={AccessStyles.body}>Redirecting you to the home page</p>

    </div>
  ) 
}

export default NoAccess
