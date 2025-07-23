import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Grid from "@mui/material/Grid";
import UserList from '../layouts/UserList';

const Home = () => {
  let navigate = useNavigate()
  let data = useSelector((state)=>state.activeUser.value)

  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  },[])
  
  return (
    <div className='homeLayout'>
      <Grid container spacing={3}>
        <Grid size={4}>
          <UserList/>
        </Grid>
        <Grid size={4}>
          <UserList/>
        </Grid>
        <Grid size={4}>
          <UserList/>
        </Grid>
      </Grid>
    </div>
    
  )
}

export default Home