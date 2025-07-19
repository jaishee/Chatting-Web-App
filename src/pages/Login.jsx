import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import LoginImage from '../assets/Login.png'
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import GoogleImg from '../assets/Google.png'
import { LuEye, LuEyeClosed } from "react-icons/lu";

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#11175D',
  },
  
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#11175D',
    },  
  },
  width: '424px',
  marginBottom: '33px'
  
});

const CssButton = styled(Button)({
    width:"424px",
    height:"72px",
    borderRadius: "9px",
    background: "#5F35F5",
    padding: "19px 0px",
    fontSize: "21px",
    fontFamily: '"Open Sans", sans-serif',
    textTransform: "capitalize",
    marginTop:"17px"
});
const Login = () => {
  let [showPassword,setShowPassword]=useState(false)
  
  return (
    <Grid container>
        <Grid size={6}>
          <div className='reg-content-box'>
            <div className='reg-content'>
            <h2>Login to your account!</h2>
            <p>Free register and you can enjoy it</p>
            <CssTextField id="outlined-basic" label="Email Address" variant="outlined" />
            <div className='logPasswordField'>
              <CssTextField type={showPassword?"text":"password"} id="outlined-basic" label="Password" variant="outlined" />
              <div onClick={()=>setShowPassword(!showPassword)} className='logEyeIcon'>
                {
                  showPassword 
                  ?
                  <LuEye />
                  :
                  <LuEyeClosed />
                } 
              </div>
            </div>
            <CssButton variant="contained">Login to Continue</CssButton>
            <div className='loginType'>
              <img src={GoogleImg} alt="" />
              <p>Login with Google</p>
            </div>
            <p>Don’t have an account ? <Link to='/'><span>Sign Up</span></Link></p>
          </div>
          </div>
        </Grid>
        <Grid size={6}>
          <img className='log-image' src={LoginImage} alt="" />
        </Grid>
      </Grid>
  )
}

export default Login