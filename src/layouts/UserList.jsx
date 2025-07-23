import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

const UserList = () => {
  return (
    <div  className="userListBox">
        <div className='searchBox'>
            <IoSearchOutline className='searchIcon' />
            <input type="text" placeholder='Search' />
            <BsThreeDotsVertical className='threeDotIcon'/>
        </div>
        <div className='userListProfileBox'>
            <div className=''>
            <h3>User List</h3>
            <BsThreeDotsVertical className='threeDotIcon'/>
        </div>
        </div>
    </div>
  )
}

export default UserList