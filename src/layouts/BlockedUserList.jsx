<<<<<<< HEAD
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

=======
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

>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
export default BlockedUserList