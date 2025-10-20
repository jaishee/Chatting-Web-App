<<<<<<< HEAD
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

=======
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

>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
export default GroupList