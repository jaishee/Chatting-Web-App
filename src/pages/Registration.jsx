import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import RegistrationImage from '../assets/Registration.png'
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
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
  let [showPassword,setShowPassword]=useState(false)
  let [email,setEmail]=useState("")
  let [name,setName]=useState("")
  let [password,setPassword]=useState("")
  let [emailError,setEmailError]=useState("")
  let [nameError,setNameError]=useState("")
  let [passwordError,setPasswordError]=useState("")

  let handleEmail=(e)=>{
    setEmail(e.target.value)
    setEmailError("")
  }
  let handleName=(name)=>{
    setName(name.target.value)
    setNameError("")
  }
  let handlePassword=(password)=>{
    setPassword(password.target.value)
    setPasswordError("")
  }
  let handleSignUp=()=>{
    if(!email){
      setEmailError("* Email is required")
    }else{
      if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailError("Enter a valid email")
      }
    }
    if(!name){
      setNameError("* Name is required")
    }
    if(!password){
      setPasswordError("* Password is required")
    }else if(!/(?=.*[a-z])/.test(password)){
      setPasswordError("Ensures at least one lowercase letter")
    }else if(!/(?=.*[A-Z])/.test(password)){
      setPasswordError("Ensures at least one uppercase letter")
    }else if(!/(?=.*\d)/.test(password)){
      setPasswordError("Ensures at least one digit")
    }else if(!/(?=.*[@$!%*?&])/.test(password)){
      setPasswordError("Ensures at least one special character")
    }else if(!/([A-Za-z\d@$!%*?&]{8,}$)/.test(password)){
      setPasswordError("Ensures the password is at least 8 characters long")
    }
    
    
    
  }
  
  return (
    <Grid container>
        <Grid size={6}>
          <div className='reg-content-box'>
            <div className='reg-content'>
            <h2>Get started with easily register</h2>
            <p className='paragraph'>Free register and you can enjoy it</p>
            {
              emailError && <p className='errorMessage'>{emailError}</p>
            }
            <CssTextField onChange={handleEmail} id="outlined-basic" label="Email Address" variant="outlined" />
            {
              nameError && <p className='errorMessage'>{nameError}</p>
            }
            <CssTextField onChange={handleName} id="outlined-basic" label="Full Name" variant="outlined" />
            {
              passwordError && <p className='errorMessage'>{passwordError}</p>
            }
            <div className='regPasswordField'>
              <CssTextField onChange={handlePassword} type={showPassword?"text":"password"}  id="outlined-basic" label="Password" variant="outlined" />
              <div onClick={()=>setShowPassword(!showPassword)} className='regEyeIcon'>
                {
                  showPassword 
                  ? 
                  <LuEye />
                  :
                  <LuEyeClosed />
                }
              </div>
            </div>
            <CssButton onClick={handleSignUp} variant="contained">Sign Up</CssButton>
            <p>Already  have an account ? <Link to='/login'><span>Sign In</span></Link></p>
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