import {React, useState, useEffect} from 'react'
import updateStyles from './UpdatePatientInfo.module.css'
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Grid } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import dayjs from 'dayjs';

import { usePatientData, useUsers, useUpdatePatientData} from '../../queries/users'

const UpdatePatientInfo = () => {
    const {mutate: updatePatientInfoMutation} = useUpdatePatientData();
  const {data : patientData, isLoading: patientDataIsLoading, error: patientDataError} = usePatientData();
  const {data : userData, isLoading: userDataIsLoading, error: userDataError} = useUsers();
  const [fetchedUserData, setFetchedUserData] = useState({
    email:'',
    firstName:'',
    lastName:'',
    contact_number:'',
         // enumber: patient.ptn_econtactnum
});
  const [fetchedPatientData, setFetchedPatientData] = useState({
  dob: "",                  // dob: extractDob.rows[0].dob
  age: "",                  // age: patientAge
  gender: "",               // gender: patient.ptn_sex
  unit: "",                 // unit: patient.ptn_addrunit
  street: "",               // street: patient.ptn_addrst
  barangay: "",             // barangay: patient.ptn_addrbrgy
  city: "",                 // city: patient.ptn_addrcity
  zipcode: "",              // zipcode: patient.zipcode
  hmoCardPresented: "",     // hmoCardPresented: patient.ptn_hmoprov
  hmoNumber: "",            // hmoNumber: patient.ptn_hmoidnum
  id: "",                   // id: patient.ptn_validtype
  idNumber: "",             // idNumber: patient.ptn_validnum
  employer: "",             // employer: patient.ptn_employer
  econtact: "",             // econtact: patient.ptn_econtactname
  enumber: "",              // enumber: patient.ptn_econtactnum
});
    const [contactNumberError, setContactNumberError] = useState();
    const [contactNumberHelperText, setContactNumberHelperText] = useState();
    const [econtactNumberError, setEContactNumberError] = useState();
    const [econtactNumberHelperText, setEContactNumberHelperText] = useState();
  const [updateUserData, setUpdateUserData] = useState({
middleInitial: '',
  firstName:'',
  lastName:'',
  contact_number:'',
  dob: "",                  // dob: extractDob.rows[0].dob
  age: "",                  // age: patientAge
  gender: "",               // gender: patient.ptn_sex
  unit: "",                 // unit: patient.ptn_addrunit
  street: "",               // street: patient.ptn_addrst
  barangay: "",             // barangay: patient.ptn_addrbrgy
  city: "",                 // city: patient.ptn_addrcity
  zipcode: "",              // zipcode: patient.zipcode
  hmoCardPresented: "",     // hmoCardPresented: patient.ptn_hmoprov
  hmoNumber: "",            // hmoNumber: patient.ptn_hmoidnum
  id: "",                   // id: patient.ptn_validtype
  idNumber: "",             // idNumber: patient.ptn_validnum
  employer: "",             // employer: patient.ptn_employer
  econtact: "",             // econtact: patient.ptn_econtactname
  enumber: "",              // enumber: patient.ptn_econtactnum
});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!userData || !patientData || isInitialized) return;
    
    setUpdateUserData(prev => ({
      ...prev,
      ...userData,
      ...patientData
    }));
    setIsInitialized(true);
  }, [userData, patientData, isInitialized]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUpdateUserData(prev => ({
      ...prev,
      [name]: value
    }));
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

    const handleEContactNumberChange = (e) =>{
        
        const contactNumber = e.target.value;
        console.log(contactNumber)

        if(!isValidContactNumber(contactNumber)){
            console.log('not valid contact Number')
            setEContactNumberError(true)
            setEContactNumberHelperText('Please Enter a valid contact number')
        } else{
            console.log('is valid contact number')
            setEContactNumberError(false)
            setEContactNumberHelperText('Valid contact number')
        }
    }

  if (userDataIsLoading ||patientDataIsLoading) return <div>Loading...</div>;
  if (userDataError || patientDataError) return <div>Error: {userDataError.message}</div>;
  console.log(updateUserData)
  return (
    <div>
        <div className={updateStyles.rowTwo}>
          <div className={updateStyles.fieldGrid}>
                <p className={updateStyles.subHeader}>PERSONAL INFORMATION</p>
                <Grid container spacing={3}>

<Grid container spacing={3}>
  {/* Row One */}
  <Grid size={3.5}>
    <TextField 
      required 
      label="Last Name"
      value={updateUserData.lastName || ""}
      name="lastName"
      onChange={inputHandler}
      fullWidth
    />
  </Grid>
  <Grid size={3.5}>
    <TextField 
      required 
      label="First Name"
      value={updateUserData.firstName || ""}
      name="firstName"
      onChange={inputHandler}
      fullWidth
    />
  </Grid>
  <Grid size={1}>
    <TextField 
      required 
      label="M.I."
      value={updateUserData.middleInitial || ""}
      inputProps={{ maxLength: 1 }}
      name="middleInitial"
      onChange={inputHandler}
      fullWidth
    />
  </Grid>
  <Grid size={1}>
    <TextField 
      required 
      label="Age"
      value={updateUserData.age || ""}
      disabled
      name="age"
      onChange={inputHandler}
      fullWidth
    />
  </Grid>
  <Grid size={3}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker 
        label="Birth Date"
        value={updateUserData.dob ? dayjs(updateUserData.dob) : null}
        onChange={(newValue) => {
          setUpdateUserData(prev => ({
            ...prev,
            dob: newValue ? newValue.format('YYYY-MM-DD') : ''
          }));
        }}
        slotProps={{ textField: { fullWidth: true } }}
      />
    </LocalizationProvider>
  </Grid>
  
  {/* Row Two */}
  <Grid size={5}>
    <TextField 
      required 
      label="Home Address"
      value={`${updateUserData.unit || ''} ${updateUserData.street || ''} ${updateUserData.barangay || ''}`.trim()}
      name="street"
      onChange={inputHandler}
      fullWidth
    />                
  </Grid>
  <Grid size={2}>
    <TextField 
      required 
      label="City"
      value={updateUserData.city || ""}
      name="city"
      onChange={inputHandler}
      fullWidth
    />                
  </Grid>
  <Grid size={2}>
    <TextField 
      required 
      label="Gender"
      value={updateUserData.gender || ""}
      name="gender"
      disabled
      onChange={inputHandler}
      fullWidth
    />                
  </Grid>
  <Grid size={3}>
    <TextField 
      required 
      label="Phone Number"
      value={updateUserData.contact_number || ""}
      name="contact_number"
          error={contactNumberError}
    helperText={contactNumberHelperText}
      onChange={(e)=>{
        inputHandler(e)
        handleContactNumberChange(e)
      }}
      fullWidth
    />                
  </Grid>
  
  {/* Row Three */}
  <Grid size={5}>
    <TextField 
      required 
      label="HMO Card Represented"
      value={updateUserData.hmoCardPresented || ""}
      name="hmoCardPresented"
      onChange={inputHandler}
      fullWidth
    />                
  </Grid>
  <Grid size={2}>
    <TextField 
      required 
      label="HMO ID Number"
      value={updateUserData.hmoNumber || ""}
      name="hmoNumber"
      onChange={inputHandler}
      fullWidth
    />                
  </Grid>
  <Grid size={2}>
    <TextField 
      required 
      label="Valid ID Presented"
      value={updateUserData.id || ""}
      name="id"
      onChange={inputHandler}
      fullWidth
    />                
  </Grid>
  <Grid size={3}>
    <TextField 
      required 
      label="Valid ID Number"
      value={updateUserData.idNumber || ""}
      name="idNumber"
      onChange={inputHandler}
      fullWidth
    />                
  </Grid>
  
  {/* Row Four */}
  <Grid size={3}>
    <TextField 
      required 
      label="Company"
      value={updateUserData.employer || ""}
      name="employer"
      onChange={inputHandler}
      fullWidth
    />                
  </Grid>
     
 
  <Grid size={3}>
    <TextField 
      required 
      label="Personal Email Address"
      disabled
      value={updateUserData.email || ""}
      name="email"
      onChange={inputHandler}
      fullWidth
    />                
  </Grid>
  
  {/* Row Five */}
  <Grid size={3}>
    <TextField 
      required 
      label="Emergency Contact Person"
      value={updateUserData.econtact || ""}
      name="econtact"
             onChange={inputHandler}

      fullWidth
    />                
  </Grid>
  <Grid size={3}>
    <TextField 
      required 
      label="Emergency Phone Number"
      value={updateUserData.enumber || ""}
      name="enumber"
       error={econtactNumberError}
        helperText={econtactNumberHelperText}
        onChange={(e)=>{
        inputHandler(e)
        handleEContactNumberChange(e)
      }}
      fullWidth
    />                
  </Grid>
</Grid>
</Grid>
          </div>
          <Button
                      variant="outlined"
                      sx={{
                        width: "80px",
                        position:'absolute',
                        right:'0',
                        bottom:'-50px',
                        border: "1px solid var(--primary-color)",
                        padding: "1rem",
                        backgroundColor: "var(--primary-color)",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        whiteSpace: "nowrap",
                        color: "white",
                        textTransform: "none",
                        borderRadius:'5px',
                        height:'15px'                        

                      }}
                    onClick={()=>{
                        updatePatientInfoMutation(updateUserData,{
                                    onSuccess: (data) => {
                                        console.log('success')
                                        toast('All data updated successfully')
                                    }
                                })
                    }}
                    >Update</Button>
        </div>
      <ToastContainer />
    </div>
  )
}

export default UpdatePatientInfo
