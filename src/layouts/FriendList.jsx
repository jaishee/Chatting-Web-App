import React, { useEffect, useState } from 'react'
import Group1 from "../assets/group1.png";
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSearchOutline } from 'react-icons/io5'
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendList = () => {

  const db = getDatabase();
  let [friend, setFriend] = useState([]);
  let data = useSelector((state) => (state.activeUser.value));


  const handleBlock = (item) => {
    let blockedName = data.uid === item.receiverID ? item.senderName : item.receiverName;
    let blockedID = data.uid === item.receiverID ? item.senderID : item.receiverID;

    set(push(ref(db, "blocklist/")), {
      block: blockedName,
      blockID: blockedID,
      blockBy: data.displayName,
      blockByID: data.uid,
    }).then(() => {
      remove(ref(db, "friend/" + item.key));
    });
  };

  useEffect(() => {
      const friendRef = ref(db, "friend/");
      let arr = [];
      onValue(friendRef, (snapshot) => {
        snapshot.forEach((item) => {
            if(data.uid == item.val().receiverID || data.uid == item.val().senderID){
              arr.push({...item.val(),key:item.key});
            }
        });
        setFriend(arr);
      });
  }, []);

  return (
    <div className="userListBox friendListBox">
          <div className="searchBox">
            <IoSearchOutline className="searchIcon" />
            <input type="text" placeholder="Search" />
            <BsThreeDotsVertical className="threeDotIcon" />
          </div>
          <div className="userListProfileBox">
            <div className="profileTitleBox">
              <h3>Friends</h3>
              <BsThreeDotsVertical className="threeDotIcon" />
            </div>
            {
              friend.map(item=>(
                <div className="userProfileBody">
                      <div className="profileBodyBox">
                          <div className="otherProfileImage">
                              <img src={Group1} alt="" />
                          </div>
                          <div className="userProfileInfo">
                              <h4>{data.uid==item.receiverID ?item.senderName :item.receiverName}</h4>
                              
                          </div>
                      </div>
                      <button onClick={()=>handleBlock(item)} className="">Block</button>
                  </div>
              ))
            }
          </div>
    </div>
  )
}


export default FriendList