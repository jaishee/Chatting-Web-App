import React from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';

const GroupList = () => {
  return (
    <div className="userListBox groupListBox">
      <div className="searchBox">
        <IoSearchOutline className="searchIcon" />
        <input type="text" placeholder="Search" />
        <BsThreeDotsVertical className="threeDotIcon" />
      </div>
      <div className="userListProfileBox">
        <div className="profileTitleBox">
          <h3>Group List</h3>
          <BsThreeDotsVertical className="threeDotIcon" />
        </div>
        <SingleUser userTitle="Friends Reunion" message="Hi Guys, Wassup!" buttonName="Join"/>
        <SingleUser userTitle="Friends Reunion" message="Hi Guys, Wassup!" buttonName="Join"/>
        <SingleUser userTitle="Friends Reunion" message="Hi Guys, Wassup!" buttonName="Join"/>
        <SingleUser userTitle="Friends Reunion" message="Hi Guys, Wassup!" buttonName="Join"/>
        <SingleUser userTitle="Friends Reunion" message="Hi Guys, Wassup!" buttonName="Join"/>
        <SingleUser userTitle="Friends Reunion" message="Hi Guys, Wassup!" buttonName="Join"/>
      </div>
    </div>
  )
}

export default GroupList