<<<<<<< HEAD
import React from "react";
import SingleUser from "../components/SingleUser";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

const MygroupsList = () => {
  return (
    <div className="userListBox myGroupList">
      <div className="searchBox">
        <IoSearchOutline className="searchIcon" />
        <input type="text" placeholder="Search" />
        <BsThreeDotsVertical className="threeDotIcon" />
      </div>
      <div className="userListProfileBox">
        <div className="profileTitleBox">
          <h3>My Groups</h3>
          <BsThreeDotsVertical className="threeDotIcon" />
        </div>
        <SingleUser
          userTitle="Friends Reunion"
          message="Hi Guys, Wassup!"
          buttonName="Join"
        />
      </div>
    </div>
  );
};

export default MygroupsList;
=======
import React from "react";
import SingleUser from "../components/SingleUser";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

const MygroupsList = () => {
  return (
    <div className="userListBox myGroupList">
      <div className="searchBox">
        <IoSearchOutline className="searchIcon" />
        <input type="text" placeholder="Search" />
        <BsThreeDotsVertical className="threeDotIcon" />
      </div>
      <div className="userListProfileBox">
        <div className="profileTitleBox">
          <h3>My Groups</h3>
          <BsThreeDotsVertical className="threeDotIcon" />
        </div>
        <SingleUser
          userTitle="Friends Reunion"
          message="Hi Guys, Wassup!"
          buttonName="Join"
        />
      </div>
    </div>
  );
};

export default MygroupsList;
>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
