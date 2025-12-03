import {React, createContext, useContext, useState} from 'react'
import { postUserData } from '../../api/postUserData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    personalInfo:{
      // firstName:'',
      // lastName:'',
      middleName:'',
      // age:null,
      gender:'',
      dob:'',
    },
    contactInfo: {
      unit:'',
      street:'',
      barangay:'',
      city:'',
      cityCode:'',
      zipcode:'',
      religion:'',
      country:'',
      employer:'',
      contactNumber:'',
      // email:''
    },
    identification:{
      Hmo:{
        name:'',
        cardNumber:''
      },
      Id:{
        type:'',
        number:''
      }
    },
    emergencyInfo:{
      contactPerson:'',
      relationship:'',
      contactNumber:'',
      altNumber:''
    }
  });



  return (
    <AppContext.Provider value={{ formData, setFormData }}>
      {children}
    </AppContext.Provider>
  );

}

export function useAppContext(){
  return useContext(AppContext);
}

export default AppContext;
