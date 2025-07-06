import React from 'react'
import Grid from '@mui/material/Grid';
import RegistrationImage from '../assets/Registration.png'
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#11175D',
  },
  
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#11175D',
    },  
  },
  width: '60%',
  marginBottom: '33px'
  
});

const CssButton = styled(Button)({
    width:"60%",
    borderRadius: "86px",
    background: "#5F35F5",
    padding: "19px 0px",
    fontSize: "20px",
    fontFamily: '"Nunito", sans-serif',
    textTransform: "capitalize",
    marginTop:"17px"
});

const Registration = () => {
  return (
    <Grid container>
        <Grid size={6}>
          <div className='reg-content-box'>
            <div className='reg-content'>
            <h2>Get started with easily register</h2>
            <p>Free register and you can enjoy it</p>
            <CssTextField id="outlined-basic" label="Email Address" variant="outlined" />
            <CssTextField id="outlined-basic" label="Full Name" variant="outlined" />
            <CssTextField id="outlined-basic" label="Password" variant="outlined" />
            <CssButton variant="contained">Sign Up</CssButton>
            <p>Already  have an account ? <span>Sign In</span></p>
          </div>
          </div>
        </Grid>
        <Grid size={6}>
          <img className='reg-image' src={RegistrationImage} alt="" />
        </Grid>
      </Grid>
  )
}

export default Registration