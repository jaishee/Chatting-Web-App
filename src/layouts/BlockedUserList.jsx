import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import Group1 from "../assets/group1.png";
import { getDatabase, ref, onValue, set, push, remove } from "firebase/database";
import { useSelector } from "react-redux";

const BlockedUserList = () => {
  const db = getDatabase();
  const [blockUser, setBlockUser] = useState([]);
  const data = useSelector((state) => state.activeUser.value);

  const handleUnblock = (item) => {
    // Re-add friendship
    set(push(ref(db, "friend/")), {
      senderID: item.blockedID,
      senderName: item.blockedName,
      receiverID: item.blockedByID,
      receiverName: item.blockedByName,
    }).then(() => {
      // Remove from blocklist
      remove(ref(db, "blocklist/" + item.id));
    });
  };

  useEffect(() => {
    const blockRef = ref(db, "blocklist/");

    onValue(blockRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((snap) => {
        let v = snap.val();

        // If blocked 
        if (v.blockByID === data.uid) {
          arr.push({
            id: snap.key,
            blockedName: v.block,
            blockedID: v.blockID,
            blockedByName: v.blockBy,
            blockedByID: v.blockByID,
            youBlocked: true,
          });
        }

        // If get blocked
        else if (v.blockID === data.uid) {
          arr.push({
            id: snap.key,
            blockedName: v.blockBy,
            blockedID: v.blockByID,
            blockedByName: v.block,
            blockedByID: v.blockID,
            youBlocked: false,
          });
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

        {blockUser.map((item) => (
          <div className="userProfileBody" key={item.id}>
            <div className="profileBodyBox">
              <div className="otherProfileImage">
                <img src={Group1} alt="" />
              </div>

              <div className="userProfileInfo">
                <h4>{item.blockedName}</h4>
              </div>
            </div>

            {item.youBlocked ? (
              <button onClick={() => handleUnblock(item)}>Unblock</button>
            ) : (
              <p className="friendB">Blocked you!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockedUserList;
