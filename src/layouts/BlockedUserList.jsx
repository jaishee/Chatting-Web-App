
import React from 'react'
import SingleUser from '../components/SingleUser'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSearchOutline } from 'react-icons/io5'

const BlockedUserList = () => {
  return (
    <div className="userListBox blockedUserListBox">
              <div className="searchBox">
                <IoSearchOutline className="searchIcon" />
                <input type="text" placeholder="Search" />
                <BsThreeDotsVertical className="threeDotIcon" />
              </div>
              <div className="userListProfileBox">
                <div className="profileTitleBox">
                  <h3>Blocked Users</h3>
                  <BsThreeDotsVertical className="threeDotIcon" />
                </div>
                <SingleUser userTitle="Friends Reunion" message="Hi Guys, Wassup!" buttonName="Unblock"/>
              </div>
    </div>
  )
}

export default BlockedUserList