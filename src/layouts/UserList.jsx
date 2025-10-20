<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  let [userList, setUserList] = useState([]);
  let [concateFriendRequest, setConcetFriendRequest] = useState([]);
  let [concateFriend, setConcetFriend] = useState([]);
  let data = useSelector((state) => state.activeUser.value);

  let handleFriendRequest = (item) => {
    console.log(item);
    set(push(ref(db, "friendrequest/")), {
      receiverID: item.id,
      receiverName: item.username,
      senderID: data.uid,
      senderName: data.displayName,
    });
  };

  useEffect(() => {
    const userListRef = ref(db, "userlist/");

    onValue(userListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if(data.uid != item.key){
          arr.push({...item.val(),id:item.key});
        }
      });
      setUserList(arr);
    });
  }, []);

  useEffect(() => {
    const userListRef = ref(db, "friendrequest/");

    onValue(userListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderID + item.val().receiverID);
      });
      setConcetFriendRequest(arr);
    });
  }, []);

  useEffect(() => {
        const friendRef = ref(db, "friend/");
        let arr = [];
    
        onValue(friendRef, (snapshot) => {
          snapshot.forEach((item) => {
            if(item.val().receiverID==data.uid){
              arr.push(item.val().receiverID + item.val().senderID);
            }
          });
  
          setConcetFriend(arr);
        });
    }, []);
  

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

        {userList.map((item) => (
          <div className="userProfileBody">
            <div className="profileBodyBox">
              <div className="otherProfileImage">
                <img src={item.photo} alt="" />
              </div>
              <div className="userProfileInfo">
                <h4>{item.username}</h4>
              </div>
            </div>
            {
              concateFriend.includes(item.id + data.uid) ||
              concateFriend.includes(data.uid + item.id) ? 
              <p className="friendP">Friend</p>
              :
              concateFriendRequest.includes(item.id + data.uid) ||
              concateFriendRequest.includes(data.uid + item.id) ? 
              <button onClick={() => handleFriendRequest(item)} className="clickPendingButton">Pending</button>
              : 
              <button
                onClick={() => handleFriendRequest(item)}
                className="clickAddButton"
              >
                Add
              </button>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
=======
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";

const UserList = () => {
  const db = getDatabase();
  let [userList, setUserList] = useState([]);
  let [concateFriendRequest, setConcetFriendRequest] = useState([]);
  let [concateFriend, setConcetFriend] = useState([]);
  let data = useSelector((state) => state.activeUser.value);

  let handleFriendRequest = (item) => {
    console.log(item);
    set(push(ref(db, "friendrequest/")), {
      receiverID: item.id,
      receiverName: item.username,
      senderID: data.uid,
      senderName: data.displayName,
    });
  };

  useEffect(() => {
    const userListRef = ref(db, "userlist/");

    onValue(userListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if(data.uid != item.key){
          arr.push({...item.val(),id:item.key});
        }
      });
      setUserList(arr);
    });
  }, []);

  useEffect(() => {
    const userListRef = ref(db, "friendrequest/");

    onValue(userListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push(item.val().senderID + item.val().receiverID);
      });
      setConcetFriendRequest(arr);
    });
  }, []);

  useEffect(() => {
        const friendRef = ref(db, "friend/");
        let arr = [];
    
        onValue(friendRef, (snapshot) => {
          snapshot.forEach((item) => {
            if(item.val().receiverID==data.uid){
              arr.push(item.val().receiverID + item.val().senderID);
            }
          });
  
          setConcetFriend(arr);
        });
    }, []);
  

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

        {userList.map((item) => (
          <div className="userProfileBody">
            <div className="profileBodyBox">
              <div className="otherProfileImage">
                <img src={item.photo} alt="" />
              </div>
              <div className="userProfileInfo">
                <h4>{item.username}</h4>
              </div>
            </div>
            {
              concateFriend.includes(item.id + data.uid) ||
              concateFriend.includes(data.uid + item.id) ? 
              <p className="friendP">Friend</p>
              :
              concateFriendRequest.includes(item.id + data.uid) ||
              concateFriendRequest.includes(data.uid + item.id) ? 
              <button onClick={() => handleFriendRequest(item)} className="clickPendingButton">Pending</button>
              : 
              <button
                onClick={() => handleFriendRequest(item)}
                className="clickAddButton"
              >
                Add
              </button>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
