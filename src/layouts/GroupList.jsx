import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from '../components/SingleUser';
import { getDatabase, ref, onValue, set, remove, push } from "firebase/database";

const GroupList = () => {
  const db = getDatabase();
  let [allGroup, setAllGroup] = useState([]);

  let handleJoinGroup=()=>{
    
  }

  useEffect(()=>{
      const myGroupListRef = ref(db, "myGroup/"); 
          onValue(myGroupListRef, (snapshot) => { 
            let arr = []; 
            snapshot.forEach((item) => { 
                arr.push({...item.val()}) 
            }); 
            setAllGroup(arr); 
          }); 
    },[])
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
        {
          allGroup.map((item)=>(
            <div className="userProfileBody">
                <div className="profileBodyBox">
                    <div className="otherProfileImage">
                        <img src={item.groupPicture} alt="" />
                    </div>
                    <div className="userProfileInfo">
                        <h4>{item.groupName}</h4>
                        <p>{item.description}</p>
                    </div>
                </div>
                <button onClick={handleJoinGroup} className="">Join</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default GroupList