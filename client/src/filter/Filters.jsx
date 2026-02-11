import React from 'react'
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FaFilter } from "react-icons/fa";
import { Flex } from '@chakra-ui/react';

// import FilterPopover from './FilterPopover.jsx';

const status = [
    'pending',
    'scheduled',
    'completed',
    'approved',
    'cancelled',
]

const Filters = ({columnFilters, setColumnFilters}) => {
    const filterStatuses = columnFilters.find(
        f=> f.id === 'appt_status'
    )?.value || []
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const taskName = columnFilters.find( f => f.id === 'patient_name')?.value || ''
  
    const onFilterChange = (id, value) => setColumnFilters(
        prev => prev.filter(f => f.id !== id).concat({
            id,value
        })
    )

    return (
    <div style={{
        display:'flex',
        gap:'1rem',
        position:'absolute',
        right:0,
    }}>
        <TextField
          label="Search"
          name="email"
          type="email"
          value={taskName}
          onChange={(e) => onFilterChange('patient_name', e.target.value)}
          fullWidth
          size="small"
          variant="outlined"
        //   error={Boolean(error)}
        //   helperText={error}
        />
    <Button variant="contained" 
    sx={{
        width:'fit-content',
        whiteSpace:'nowrap',
        
    }}
    onClick={handleClick}
    >
        <div
        style={{
            display:'flex',
            gap:'.3rem',
            alignItems:'center',
            padding:'.1rem 1rem',
        }}
        >
            <FaFilter />
            <p>Filter</p>
        </div>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}

         slotProps={{
           paper: {
             sx: {
               borderRadius: '10px',
               marginTop:'1rem'
             }
           }
         }}
      >
        <Typography sx={{ p: 2 }}>            
            <p
            style={{
                paddingLeft:'.5rem',
                paddingBottom:'.5rem',
                marginBottom:'.5rem',
                color:'#1976D2',
                fontWeight:'600',
                borderBottom:'1px solid var(--border-color)'
            }}
            >Filter By Status:</p>


            <div style={{
                display:'flex',
                flexFlow:'column',
                gap:'.5rem',
            }}>        
            {status.map((s)=>(
                <p style={{
                    cursor:'pointer',
                    backgroundColor:(filterStatuses.includes(s) ? '#57C65B' : ''),
                    color:(filterStatuses.includes(s) ? 'white' : ''),
                    padding:'.5rem .5rem',
                    // 'var(--border-color)',
                    borderRadius:'5px',
                    textAlign:'left',
                }}


                onClick={()=>{
                    setColumnFilters( prev=> {
                        console.log(prev)
                        console.log(filterStatuses)
                        const statuses = prev.find(filter => filter.id === 'appt_status')?.value
                        console.log(statuses)
                        
                        if(!statuses){
                            return prev.concat({
                                id:'appt_status',
                                value:[s]
                            })
                        }

                        return prev.map(
                            f => f.id === 'appt_status' ? {
                                ...f,
                                value: (filterStatuses.includes(s)) 
                                    ? statuses.filter(status => status !== s)
                                    : statuses.concat(s)  
                            } : f
                        )
                    })
                    
                }}
                >{s.toUpperCase().slice(0,1)+s.slice(1)}</p>
            ))}
            </div>
{/*             
            <p>Date</p>
            <p>Time</p>
            <p>Therapist</p>
            <p>Payment</p>
            <p>Status</p> */}
        </Typography>
      </Popover>
    </div>
  )
}

export default Filters
