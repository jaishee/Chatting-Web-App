import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navigate = useNavigate()
  let data = useSelector((state)=>state.activeUser.value)

  useEffect(()=>{
    if(!data){
      navigate('/login')
    }
  },[])
  
  return (
    <div>
      <h1>Home</h1>
      <button>Logout</button>
    </div>
    
  )
}

export default Home