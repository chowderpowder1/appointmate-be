import { React, useRef, useState } from 'react'
import TwoStyles from './StepTwo.module.css'

// Icon Imports
import { FaCamera } from "react-icons/fa";

// Mui dependencies
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';

// Use Context
import {useAppContext} from './AppContext.jsx'
import {useCountries} from '../../queries/countries.js'
import {usephCities} from '../../queries/phCities.js'
import {useBarangays} from '../../queries/barangays.js'

const StepTwo = () => {
  const {formData, setFormData} = useAppContext();
    console.log(formData.contactInfo.cityCode);

const [cityCode, setCityCode] = useState(formData.contactInfo.cityCode);

  const { data: countryData, isLoading: countryIsLoading, error: countryError } = useCountries();  
  const { data: phCitydata, isLoading: phCityIsLoading, error: phCityError } = usephCities();  
  const { data: barangayData, isLoading: barangayIsLoading, error: barangayError } = useBarangays(cityCode);  
  
  console.log(barangayData)
  const [religion, setReligion] = useState('');

  if (countryIsLoading || phCityIsLoading || barangayIsLoading) return <div>Loading...</div>;
  if (countryError || phCityError || barangayError) return <div>Error: {error.message}</div>;

  // Sorts api response - initial response is not sorted
  var mappedCountries = countryData.map( c => ({
    name: c.name.common
  }))


  mappedCountries.sort((a, b) => a.name.localeCompare(b.name))

  var mappedphCities = phCitydata.map( c => ({
    name: c.name,
    cityCode: c.code
  }))

  mappedphCities.sort((a, b) => a.name.localeCompare(b.name))

  if (formData.contactInfo.cityCode){
    var mappedBarangays = barangayData?.map( c => ({
    name: c.name,
    }))

    mappedBarangays?.sort((a, b) => a.name.localeCompare(b.name))
  }


  const handleCityCode = (value) => {
    setFormData ( prev => ({
          ...prev,
          contactInfo: {
              ...prev.contactInfo,
              cityCode: value
      }})) 
  }

  const handleInputChange = (section) => (e) => {
      const { name, value} = e.target 
      setFormData( prev => ({
          ...prev,
          [section]: {
              ...prev[section],
              [name]: value
      }}))  
    }

  const handleChange = (event) => {
    setReligion(event.target.value);
  };


  return (
    <div>   

        <div className={TwoStyles.formContainer}>
          <p className={TwoStyles.header}>Contact Information</p>
          <Box display='flex' sx={{
            gap:'1rem'
          }}>
            <TextField onChange={handleInputChange('contactInfo')} value={formData.contactInfo.unit} id="outlined-basic" label="Unit" name='unit' variant="outlined" />
            <TextField onChange={handleInputChange('contactInfo')} name='street' value={formData.contactInfo.street} id="outlined-basic" label="Street" variant="outlined" />
            
            {/* <TextField onChange={handleInputChange('contactInfo')} name='brgy' value={formData.contactInfo.brgy} id="outlined-basic" label="Barangay" 
            variant="outlined" /> */}

             <FormControl sx={{width:'300px'}}>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.contactInfo.city}
                  name='city'
                  label="City"
                  onChange={(e)=>{
                    handleInputChange('contactInfo')(e);
                     var cityCodeTemp = mappedphCities.find(city => city.name === e.target.value)
                     handleCityCode(cityCodeTemp.cityCode);
                      setCityCode(cityCodeTemp.cityCode);
                  }}
                >
                  {mappedphCities.map((country) => (
                    <MenuItem key={country.name} value={country.name}>{country.name}</MenuItem>) 
                  )}
                </Select>
              </FormControl>

             <FormControl sx={{width:'300px'}}>
                <InputLabel id="demo-simple-select-label">Barangay</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.contactInfo.barangay}
                  name='barangay'
                  label="Barangay"
                  onChange={handleInputChange('contactInfo')}
                  >
                  {formData.contactInfo.cityCode && mappedBarangays?.map((b) => (
                    <MenuItem key={b.name} value={b.name}>{b.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

          </Box>
          <Grid container spacing={2}>
            <Grid size={3}>
              <TextField name='zipcode' value={formData.contactInfo.zipcode} onChange={handleInputChange('contactInfo')} required id="outlined-required" label="Zipcode" fullWidth/>
            </Grid>
            <Grid size={4.5}>
              <TextField name='religion' value={formData.contactInfo.religion} onChange={handleInputChange('contactInfo')} required id="outlined-required" label="Religion" fullWidth/>              
              {/* <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Religion</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={religion}
                  label="Religion"
                  onChange={handleChange}
                >
                  <MenuItem value={'Iglesia ni Chris Brown'}>Iglesia ni Chris Brown</MenuItem>
                  <MenuItem value={20}>Ipinanganak Muli</MenuItem>
                  <MenuItem value={30}>Bisayawa</MenuItem>
                </Select>
              </FormControl> */}
            </Grid>

            <Grid size={4.5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Country</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.contactInfo.country}
                  name='country'
                  label="Religion"
                  onChange={handleInputChange('contactInfo')}
                >
                  {mappedCountries.map((country) => (
                    <MenuItem value={country.name}>{country.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

          </Grid>

        </div>
    </div>
  )
}

export default StepTwo
