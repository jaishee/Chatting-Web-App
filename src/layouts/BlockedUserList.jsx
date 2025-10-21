import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { IoSearchOutline } from 'react-icons/io5'
import Group1 from "../assets/group1.png";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from 'react-redux';

const BlockedUserList = () => {
  
  const db = getDatabase();
  let [blockUser, setBlockUser] = useState([]);
  let data = useSelector((state) => (state.activeUser.value));

  let handleUnblock=(item)=>{
    console.log(item);
    set(push(ref(db, "friend/")), {
          receiverID: data.uid,
          receiverName: data.displayName,
          senderID: item.blockID,
          senderName: item.block,
        }).then(() => {
            // Remove from blocklist after adding to friend list
            remove(ref(db, "blocklist/" + item.id));
            console.log("delete")
        });
  }

  useEffect(() => {
    const blockUserRef = ref(db, "blocklist/");
  
    onValue(blockUserRef, (snapshot) => {
      let arr = [];
      snapshot.forEach(item => {
          if(data.uid == item.val().blockByID){
            arr.push({
              id:item.key,
              block: item.val().block,
              blockID: item.val().blockID
            })
          }else if(data.uid == item.val().blockID){
            arr.push({
              id:item.key,
              blockBy: item.val().blockBy,
              blockByID: item.val().blockByID
            })
          }
      });
      setBlockUser(arr);
    });
  }, []);
 
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
        {
          blockUser.map(item=>(
              <div className="userProfileBody">
                <div className="profileBodyBox">
                    <div className="otherProfileImage">
                        <img src={Group1} alt="" />
                    </div>
                    <div className="userProfileInfo">
                        <h4>{item.block}</h4> 
                        <h4>{item.blockBy}</h4> 
                    </div>
                </div>
                {
                  item.block
                  ? 
                  <button onClick={()=>handleUnblock(item)} className="">Unblock</button>
                  :
                  <p className="friendB">Blocked you!</p>
                }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default BlockedUserList