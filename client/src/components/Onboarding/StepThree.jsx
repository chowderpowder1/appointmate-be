import { React, useState } from 'react'
import ThreeStyles from './StepThree.module.css'
// Mui dependencies
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Grid } from '@mui/material';

import {useAppContext} from './AppContext.jsx'

const StepThree = () => {
    const {formData, setFormData} = useAppContext();
    const [idType, setIdType] = useState('');
    const [hmoCard, setHmoCard] = useState('');

    const handleHmo = (e) => {
    setHmoCard(e.target.value)
    }
    const handleId = (e) => {
    setIdType(e.target.value)
    }

        const hmoProvider = [
            { Hmo: 'amaphil' },
            { Hmo: 'caritas Health Shield' },
            { Hmo: 'cocoLife' },
            { Hmo: 'eastWest' },
            { Hmo: 'firstLife' },
            { Hmo: 'hartmann' },
            { Hmo: 'hmi' },
            { Hmo: 'hppi' },
            { Hmo: 'iCare' },
            { Hmo: 'medAsia' },
            { Hmo: 'pacific Cross' },
            { Hmo: 'bpiPhilam' },
            { Hmo: 'coop Health' },
            { Hmo: 'generali' },
            { Hmo: 'inLife' },
            { Hmo: 'lacson Lacson' },
            { Hmo: 'mediCard' },
            { Hmo: 'mediLink' },
            { Hmo: 'medoCare' },
            { Hmo: 'philam Life' },
            { Hmo: 'sunLife Grepa' },
            { Hmo: 'valuCare' },
            { Hmo: 'wellCare' }
        ]
        const phIdTypes =  [
            { idType: 'nationalId' },
            { idType: 'passport' },
            { idType: 'driversLicense' },
            { idType: 'umid' },
            { idType: 'sss' },
            { idType: 'philHealth' },
            { idType: 'gsis' },
            { idType: 'tin' },
            { idType: 'pagibig' },
            { idType: 'postal' },
            { idType: 'prc' },
            { idType: 'votersId' },
            { idType: 'studentId' },
            { idType: 'companyId' },
            { idType: 'seniorCitizenId' },
            { idType: 'pwdId' }
        ];

    const handleInputChange = (section, key) => (e) => {
      const { name, value} = e.target 
      setFormData( prev => ({
          ...prev,
          [section]: {
            ...prev[section],
            [key]:{
              ...prev[section][key],
              [name]: value
          }
      }}))  
      console.log(formData);
    }

  return (
    <div className={ThreeStyles.container}>
      <p className={ThreeStyles.header}>Coverage & Identification</p>
      <Grid container fullWidth rowSpacing={2} columnSpacing={2}>
        <Grid item size={7}>
           <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">HMO Card Presented</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.identification.Hmo.name}
                  name='name'
                  label="HMO Card Presented"
                  onChange={handleInputChange('identification','Hmo' )}
                >
                  {hmoProvider.map((e)=>(
                    <MenuItem value={e.Hmo}>{(e.Hmo).toUpperCase()}</MenuItem>
                  ))}
                </Select>
              </FormControl>
        </Grid>
        <Grid item size={5}>
          <TextField fullWidth value={formData.identification.Hmo.cardNumber} name='cardNumber' onChange={handleInputChange('identification', 'Hmo')} id="outlined-basic" label="HMO Card Number" variant="outlined" />
        </Grid>

        <Grid item size={7}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Valid ID Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formData.identification.Id.type}
              name='type'
              label="Valid ID Type"
              onChange={handleInputChange('identification', 'Id')}>
              {phIdTypes.map((e)=>(
                <MenuItem value={e.idType}>{(e.idType).toUpperCase()}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item size={5}>
          <TextField onChange={handleInputChange('identification', 'Id')} name='number' value={formData.identification.Id.number} fullWidth id="outlined-basic" label="Valid ID Number" variant="outlined" />
        </Grid>
    </Grid>
    </div>
  )
}

export default StepThree
