import React from 'react'
import SingleUser from '../components/SingleUser'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSearchOutline } from 'react-icons/io5'

const FriendRequestList = () => {
  return (
    <div className="userListBox friendrequstlist-box">
              <div className="searchBox">
                <IoSearchOutline className="searchIcon" />
                <input type="text" placeholder="Search" />
                <BsThreeDotsVertical className="threeDotIcon" />
              </div>
              <div className="userListProfileBox">
                <div className="profileTitleBox">
                  <h3>Friend Requests</h3>
                  <BsThreeDotsVertical className="threeDotIcon" />
                </div>
                <SingleUser userTitle="Friends Reunion" message="Hi Guys, Wassup!" buttonName="Accept"/>
              </div>
    </div>
  )
}

export default FriendRequestList