import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import SingleUser from "../components/SingleUser";

const UserList = () => {
  const db = getDatabase();
  let [userList, setUserList] = useState([])


  useEffect(() => {
    const userListRef = ref(db, "userlist/");

    onValue(userListRef, (snapshot) => {
      let arr=[]
      snapshot.forEach(item=>{
        console.log(item.val());
        arr.push({...item.val()})
      })
      setUserList(arr)
    });
    
  },[])

  console.log(userList)
  return (
    <div className="userListBox">
      <div className="searchBox">
        <IoSearchOutline className="searchIcon" />
        <input type="text" placeholder="Search" />
        <BsThreeDotsVertical className="threeDotIcon" />
      </div>
      <div className="userListProfileBox">
        <div className="profileTitleBox">
          <h3>User List</h3>
          <BsThreeDotsVertical className="threeDotIcon" />
        </div>

        {
          userList.map(item=>(
            <SingleUser userTitle={item.username} message="Hi Guys, Wassup!" buttonName="Add"/>
          ))
        }
      </div>
    </div>
  );
};

export default UserList;
