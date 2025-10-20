<<<<<<< HEAD
import Grid from '@mui/material/Grid'
import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const RootLayout = () => {
  return (
    <div>      
        <Grid container spacing={2}>
            <Grid size={2}>
                <SideBar/>
            </Grid>
            <Grid size={10}>
                <Outlet />
            </Grid>
        </Grid>
    </div>
  )
}

=======
import Grid from '@mui/material/Grid'
import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const RootLayout = () => {
  return (
    <div>      
        <Grid container spacing={2}>
            <Grid size={2}>
                <SideBar/>
            </Grid>
            <Grid size={10}>
                <Outlet />
            </Grid>
        </Grid>
    </div>
  )
}

>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
export default RootLayout