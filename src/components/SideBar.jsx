import React, { useEffect, useState } from 'react'
import Profile from '../assets/Profile.png'
import { IoHomeOutline, IoSettingsOutline  } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { removeUserDetails } from '../slices/userInfoSlice';


const SideBar = () => {

    const auth = getAuth();
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let location = useLocation()
    let [activeValue, setActiveValue] = useState("")
    

    let handleLogout=()=>{
        signOut(auth).then(() => {
            dispatch(removeUserDetails());
            localStorage.removeItem('userinfo');
            toast.success("Successfully Logout!")
            setTimeout(()=>{
                navigate('/login')
            },2000)
            }).catch((error) => {
                console.error("Logout error:", error);
        });
    }
    useEffect(()=>{
        setActiveValue(location.pathname.replace("/pages/",""))
    },)
    console.log(activeValue);
    
        
  return (
    <>
    <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    <div className='sideBar'>
        
        <div className='profileImage'>
            <img src={Profile} alt="Profile Picture" />
        </div>
        <div className='elements'>
            <Link to="/pages/home" className={activeValue=="home"&&"active"}><IoHomeOutline className='commonIcon'/></Link>
            <Link to="/pages/message" className={activeValue=="message"&&"active"}><LuMessageCircleMore className='commonIcon'/></Link>
            <Link to="/pages/notification" className={activeValue=="notification"&&"active"}><IoMdNotificationsOutline className='commonIcon'/></Link>
            <Link to="/pages/setting" className={activeValue=="setting"&&"active"}><IoSettingsOutline className='commonIcon'/></Link>
        </div>
        <div className='logout'>
            <RiLogoutBoxLine onClick={handleLogout} className='commonIcon logoutIcon'/>
        </div>

    </div>
    </>
  )
}

export default SideBar