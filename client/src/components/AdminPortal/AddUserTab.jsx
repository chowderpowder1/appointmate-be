import React, { useState } from 'react'
import AddStyles from './AddUserTab.module.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCreateEmployee } from '../../queries/admin'
import MenuItem from '@mui/material/MenuItem';

const AddUserTab = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    specialization: '' 
  });

  const createEmployee = useCreateEmployee();

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = () => {
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Validate license number and specialization for therapists
    if (formData.role === '3' && !formData.licenseNumber) {
      alert('License number is required for therapists!');
      return;
    }

    if (formData.role === '3' && !formData.specialization) {
      alert('Specialization is required for therapists!');
      return;
    }

    // Prepare employee object
    const employeeData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      role: formData.role,
      email: formData.email,
      password: formData.password,
      ...(formData.role === '3' && { 
        licenseNumber: formData.licenseNumber,
        specialization: formData.specialization 
      }) // Only include if therapist
    };

    // Call the mutation
    createEmployee.mutate(employeeData, {
      onSuccess: () => {
        // Reset form on success
        setFormData({
          firstName: '',
          lastName: '',
          role: '',
          email: '',
          password: '',
          confirmPassword: '',
          licenseNumber: '',
          specialization: ''
        });
        alert('User added successfully!');
      },
      onError: (error) => {
        alert(`Error adding user: ${error.message}`);
      }
    });
  };

  return (
    <div className={AddStyles.container}>
      <h4 className={AddStyles.header}>Add User</h4>
      <Box fullWidth display='flex' sx={{
        gap: '1rem',
        flexFlow: 'column'
      }}>
        <Box fullWidth display='flex' sx={{
          gap: '1rem'
        }}>
          <TextField
            required
            id="first-name"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange('firstName')}
            fullWidth
          />
          <TextField
            required
            id="last-name"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange('lastName')}
            fullWidth
          />
          <TextField
            required
            id="role"
            label="Role"
            select
            value={formData.role}
            onChange={handleChange('role')}
            fullWidth
          >
            <MenuItem value="">
              <em>Select a role</em>
            </MenuItem>
            <MenuItem value="2">Operations Manager</MenuItem>
            <MenuItem value="3">Therapist</MenuItem>
            <MenuItem value="4">Front Desk</MenuItem>
          </TextField>
        </Box>
        <Box fullWidth display='flex' sx={{
          gap: '1rem'
        }}>
          <TextField
            required
            id="email"
            label="Email"
            value={formData.email}
            onChange={handleChange('email')}
            fullWidth
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            fullWidth
          />
          <TextField
            required
            id="confirm-password"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            fullWidth
          />
        </Box>
        {/* Therapist-specific fields - Only enabled when Therapist is selected */}
        <Box fullWidth display='flex' sx={{
          gap: '1rem'
        }}>
          <TextField
            required={formData.role === '3'} // Required only for therapists
            id="license-number"
            label="Therapist License Number"
            value={formData.licenseNumber}
            onChange={handleChange('licenseNumber')}
            disabled={formData.role !== '3'} // Disabled unless Therapist is selected
            fullWidth
            helperText={formData.role === '3' ? 'Required for therapists' : 'Only for therapist role'}
          />
          <TextField
            required={formData.role === '3'} // Required only for therapists
            id="specialization"
            label="Specialization"
            value={formData.specialization}
            onChange={handleChange('specialization')}
            disabled={formData.role !== '3'} // Disabled unless Therapist is selected
            fullWidth
            helperText={formData.role === '3' ? 'Required for therapists' : 'Only for therapist role'}
          />
        </Box>
      </Box>
      <Button 
        className={AddStyles.addBtn} 
        variant="contained"
        onClick={handleSubmit}
        disabled={createEmployee.isLoading}
        sx={{
          position: 'absolute',
          bottom: '15px',
          right: '20px',
        }}
      >
        {createEmployee.isLoading ? 'Adding...' : 'Add User'}
      </Button>
    </div>
  )
}

export default AddUserTab