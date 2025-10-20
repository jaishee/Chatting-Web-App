<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import Group1 from "../assets/group1.png";
import { useSelector } from "react-redux";

const FriendRequestList = () => {
  const db = getDatabase();
  let [friendRequest, setFriendRequest] = useState([]);
  let data = useSelector((state) => state.activeUser.value);

  let handleAccept=(item)=>{
    set(push(ref(db, 'friend/')), {
      ...item
  }).then(()=>{
    remove(ref(db, 'friendrequest/' + item.id))
  })

  }

  useEffect(() => {
    const friendRequestRef = ref(db, "friendrequest/");
    let arr = [];

    onValue(friendRequestRef, (snapshot) => {
      snapshot.forEach((item) => {
        if(item.val().receiverID==data.uid){
          arr.push({...item.val(), id:item.key});
        }
      });
      setFriendRequest(arr);
    });
  }, []);

  return (
    <div className="userListBox friendRequestListBox">
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
        {
        friendRequest.map((item) => (
          <div className="userProfileBody">
            <div className="profileBodyBox">
              <div className="otherProfileImage">
                <img src={Group1} alt="" />
              </div>
              <div className="userProfileInfo">
                <h4>{item.senderName}</h4>
              </div>
            </div>
            <button onClick={() => handleAccept(item)} className="">Accept</button>
            <button className="">Reject</button>
          </div>
        ))
        }
      </div>
    </div>
  );
};

export default FriendRequestList;
=======
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import Group1 from "../assets/group1.png";
import { useSelector } from "react-redux";

const FriendRequestList = () => {
  const db = getDatabase();
  let [friendRequest, setFriendRequest] = useState([]);
  let data = useSelector((state) => state.activeUser.value);

  let handleAccept=(item)=>{
    set(push(ref(db, 'friend/')), {
      ...item
  }).then(()=>{
    remove(ref(db, 'friendrequest/' + item.id))
  })

  }

  useEffect(() => {
    const friendRequestRef = ref(db, "friendrequest/");
    let arr = [];

    onValue(friendRequestRef, (snapshot) => {
      snapshot.forEach((item) => {
        if(item.val().receiverID==data.uid){
          arr.push({...item.val(), id:item.key});
        }
      });
      setFriendRequest(arr);
    });
  }, []);

  return (
    <div className="userListBox friendRequestListBox">
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
        {
        friendRequest.map((item) => (
          <div className="userProfileBody">
            <div className="profileBodyBox">
              <div className="otherProfileImage">
                <img src={Group1} alt="" />
              </div>
              <div className="userProfileInfo">
                <h4>{item.senderName}</h4>
              </div>
            </div>
            <button onClick={() => handleAccept(item)} className="">Accept</button>
            <button className="">Reject</button>
          </div>
        ))
        }
      </div>
    </div>
  );
};

export default FriendRequestList;
>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
