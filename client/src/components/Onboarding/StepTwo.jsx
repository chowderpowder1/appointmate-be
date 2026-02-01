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
import {useRegion} from '../../queries/region.js'

const StepTwo = () => {
  const {formData, setFormData} = useAppContext();
 const relOptions =[
      { relationship: "Parent" },
      { relationship: "Spouse" },
      { relationship: "Child" },
      { relationship: "Sibling" },
      { relationship: "Grandparent" },
      { relationship: "Guardian" },
      { relationship: "Relative" },
      { relationship: "Friend" },
      { relationship: "Colleague" },
      { relationship: "Other" }
    ]
  const [regionCode, setRegionCode] = useState(formData.contactInfo.regionCode || '');
const [cityCode, setCityCode] = useState(formData.contactInfo.cityCode || '');

const { data: regionData, isLoading: regionDataIsLoading, error: regionDataError } = useRegion();  
const { data: countryData, isLoading: countryIsLoading, error: countryError } = useCountries();  

const { data: phCitydata, isLoading: phCityIsLoading, error: phCityError } = usephCities(regionCode);  

const { data: barangayData, isLoading: barangayIsLoading, error: barangayError } = useBarangays(cityCode);

  // Loading state
  if (countryIsLoading || regionDataIsLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (countryError || regionDataError) {
    console.error('Errors:', { countryError, regionDataError });
    return <div>Error: {regionDataError?.message || countryError?.message || 'Something went wrong'}</div>;
  }

  // Safe mapping with fallbacks
  const mappedCountries = countryData?.map(c => ({
    name: c.name.common
  })).sort((a, b) => a.name.localeCompare(b.name)) || [];

  const mappedRegions = regionData?.map(r => ({
    name: r.name,
    code: r.code
  })).sort((a, b) => a.name.localeCompare(b.name)) || [];

  const mappedphCities = phCitydata?.map(c => ({
    name: c.name,
    code: c.code
  })).sort((a, b) => a.name.localeCompare(b.name)) || [];

  const mappedBarangays = barangayData?.map(b => ({
    name: b.name,
    code: b.code
  })).sort((a, b) => a.name.localeCompare(b.name)) || [];

  const handleInputChange = (section) => (e) => {
    const { name, value } = e.target 
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }))  
  }

  const handleRegionChange = (e) => {
    const selectedRegion = mappedRegions.find(r => r.name === e.target.value);
    
    setRegionCode(selectedRegion?.code || '');
    setCityCode('');
    
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        region: e.target.value,
        regionCode: selectedRegion?.code || '',
        city: '',
        cityCode: '',
        barangay: ''
      }
    }));
  }

  const handleCityChange = (e) => {
    const selectedCity = mappedphCities.find(c => c.name === e.target.value);
    
    setCityCode(selectedCity?.code || '');
    
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        city: e.target.value,
        cityCode: selectedCity?.code || '',
        barangay: ''
      }
    }));
  }

  return (
      <div className={TwoStyles.formContainer}>
        <p className={TwoStyles.header}>Contact Information</p>
      <Grid container spacing={2} sx={{ width:'100%' }}>

        {/* <Box display='flex' sx={{ gap: '1rem' }}> */}
          <Grid size={4}>   
            <TextField fullWidth
            onChange={handleInputChange('contactInfo')} 
            value={formData.contactInfo.unit || ''} 
            id="unit-field" 
            label="Unit" 
            name='unit' 
            variant="outlined" 
          />
          </Grid>
          <Grid size={4}>    
            <TextField fullWidth
            onChange={handleInputChange('contactInfo')} 
            name='street' 
            value={formData.contactInfo.street || ''} 
            id="street-field" 
            label="Street" 
            variant="outlined" 
          />
          </Grid>

          {/* Zipcode */}
          <Grid item size={4}>
            <TextField 
              name='zipcode' 
              value={formData.contactInfo.zipcode || ''} 
              onChange={handleInputChange('contactInfo')} 
              required 
              id="zipcode-field" 
              label="Zipcode" 
              fullWidth
            />
          </Grid>
        <Grid container spacing={2} sx={{ width:'100%' }}>
          {/* Region Select */}
          <Grid size={4}>   
            <FormControl fullWidth>
                <InputLabel id="region-label">Region</InputLabel>
                <Select
                  labelId="region-label"
                  id="region-select"
                  value={formData.contactInfo.region || ''}
                  name='region'
                  label="Region"
                  onChange={handleRegionChange}
                >
                  {mappedRegions.map((region) => (
                    <MenuItem key={region.code} value={region.name}>
                      {region.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
  {/* City Select - Disabled until region is selected */}
<Grid size={4}>   
      <FormControl fullWidth disabled={!regionCode}>
      <InputLabel id="city-label">City</InputLabel>
      <Select
        labelId="city-label"
        id="city-select"
        value={formData.contactInfo.city || ''}
        name='city'
        label="City"
        onChange={handleCityChange}
      >
        {phCityIsLoading ? (
          <MenuItem disabled>Loading cities...</MenuItem>
        ) : (
          mappedphCities.map((city) => (
            <MenuItem key={city.code} value={city.name}>
              {city.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  </Grid>

  {/* Barangay Select - Disabled until city is selected */}
  <Grid item size={4}>
    <FormControl fullWidth disabled={!cityCode}>
      <InputLabel id="barangay-label">Barangay</InputLabel>
      <Select
        labelId="barangay-label"
        id="barangay-select"
        value={formData.contactInfo.barangay || ''}
        name='barangay'
        label="Barangay"
        onChange={handleInputChange('contactInfo')}
      >
        {barangayIsLoading ? (
          <MenuItem disabled>Loading barangays...</MenuItem>
        ) : (
          mappedBarangays.map((b) => (
            <MenuItem key={b.code || b.name} value={b.name}>
              {b.name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  </Grid>

          </Grid>

</Grid>

<p className={TwoStyles.header}>Emergency Contact Information</p>
        <Grid container fullWidth rowSpacing={2} columnSpacing={2}>
            <Grid size={6}>
                <TextField fullWidth name='contactPerson' value={formData.emergencyInfo.contactPerson} onChange={handleInputChange('emergencyInfo')} id="outlined-basic" label="Contact Person" variant="outlined" />
            </Grid>

        <Grid size={6}>
            <FormControl fullWidth> 
                <InputLabel id="demo-simple-select-label">Relationship</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.emergencyInfo.relationship}
                  name='relationship'
                  label="Relationship"
                  onChange={handleInputChange('emergencyInfo')}
                >
                  {relOptions.map((e)=>(
                    <MenuItem value={e.relationship}>{(e.relationship).toUpperCase()}</MenuItem>
                  ))}
                </Select>
              </FormControl>
        </Grid>
            <Grid size={6}>
                <TextField fullWidth id="outlined-basic" label="Contact Number" variant="outlined" name='contactNumber' value={formData.emergencyInfo.contactNumber} onChange={handleInputChange('emergencyInfo')}  />
            </Grid>
            <Grid size={6}>
                <TextField fullWidth id="outlined-basic" label="Alternate Number" variant="outlined" name='altNumber' value={formData.emergencyInfo.altNumber} onChange={handleInputChange('emergencyInfo')}/>
            </Grid>
        </Grid>
      </div>
  )
}

export default StepTwo