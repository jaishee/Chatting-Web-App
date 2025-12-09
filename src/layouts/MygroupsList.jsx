import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { useSelector } from "react-redux";

const CssButton = styled(Button)({
  width: "120px",
  height: "55px",
  borderRadius: "20px",
  background: "#5F35F5",
  color:"#ffffff",
  padding: "19px 0px",
  fontSize: "21px",
  fontFamily: '"Open Sans", sans-serif',
  textTransform: "capitalize",
  marginTop: "15px",
});

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#11175D",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "#11175D",
    },
  },
  width: "424px",
  marginBottom: "33px",
});

const MygroupsList = () => {
  const db = getDatabase();
  const data = useSelector((state) => state.activeUser.value);

  const [popupType, setPopupType] = useState(null); // null | "create" | "addMember"
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [image, setImage] = useState(null);
  const [concateFriend, setConcetFriend] = useState([]);
  const [concateBlock, setConcetBlock] = useState([]);
  const [userList, setUserList] = useState([]);
  const [allGroup, setAllGroup] = useState([]);
  const popUpRef = useRef(null);

  // Handle outside click for popup
  const handlePopUp = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      setPopupType(null);
    }
  };

  // Handle image change
  const onChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setPhotoURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Create new group
  const handleCreateGroup = () => {
    set(push(ref(db, "myGroup/")), {
      groupName,
      description,
      groupPicture: photoURL,
      admin: data.displayName,
      adminID: data.uid,
    });
    setPopupType(null);
    setGroupName("");
    setDescription("");
    setPhotoURL("");
    setImage(null);
  };

  // Add member to group
  const handleAddMember = (item) => {
    set(push(ref(db, "groupMember/")), {
      ...item,
    });
  };

  // Fetch blocklist
  useEffect(() => {
    const blockRef = ref(db, "blocklist/");
    let arr = [];
    onValue(blockRef, (snapshot) => {
      snapshot.forEach((item) => {
        arr.push(item.val().blockID + item.val().blockByID);
      });
      setConcetBlock(arr);
    });
  }, []);

  // Fetch friends / group members
  useEffect(() => {
    const groupMemberRef = ref(db, "groupMember/");
    let arr = [];
    onValue(groupMemberRef, (snapshot) => {
      snapshot.forEach((item) => {
        if (item.val().receiverID === data.uid || item.val().senderID === data.uid) {
          arr.push(item.val().receiverID + item.val().senderID);
        }
      });
      setConcetFriend(arr);
    });
  }, []);

  // Fetch all groups created by user
  useEffect(() => {
    const myGroupListRef = ref(db, "myGroup/");
    onValue(myGroupListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (item.val().adminID === data.uid) {
          arr.push({ ...item.val() });
        }
      });
      setAllGroup(arr);
    });
  }, []);

  // Fetch all users except current user
  useEffect(() => {
    const userListRef = ref(db, "userlist/");
    onValue(userListRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid !== item.key) {
          arr.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(arr);
    });
  }, []);

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
          <button onClick={() => setPopupType("create")} className="groupButton">
            Create Group
          </button>
        </div>

        {/* Group List */}
        {allGroup.map((item, index) => (
          <div className="userProfileBody" key={index}>
            <div className="profileBodyBox">
              <div className="otherProfileImage">
                <img src={item.groupPicture} alt="" />
              </div>
              <div className="userProfileInfo">
                <h4>{item.groupName}</h4>
                <p>{item.description}</p>
              </div>
            </div>
            <button onClick={() => setPopupType("addMember")} className="groupButton">
              Invite
            </button>
          </div>
        ))}

        {/* Popup */}
        {popupType && (
          <div onClick={handlePopUp} className="popUpImg">
            <div ref={popUpRef} className="popUpImgBox">
              {popupType === "create" && (
                <>
                  <h1>Create A New Group</h1>
                  {image && (
                    <img
                      src={image}
                      alt="Group Preview"
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginTop: "20px",
                      }}
                    />
                  )}
                  <input type="file" accept="image/*" onChange={onChange} />
                  <CssTextField
                    onChange={(e) => setGroupName(e.target.value)}
                    value={groupName}
                    label="Group Name"
                    variant="outlined"
                  />
                  <CssTextField
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    label="Description"
                    variant="outlined"
                  />
                  <div className="popUpButtonBox">
                    <CssButton onClick={() => setPopupType(null)}>Back</CssButton>
                    <CssButton onClick={handleCreateGroup}>Create</CssButton>
                  </div>
                </>
              )}

              {popupType === "addMember" && (
                <>
                  <h1>Add Member</h1>
                  {userList.map((item) => (
                    <div className="userProfileBody" key={item.id}>
                      <div className="profileBodyBox">
                        <div className="otherProfileImage">
                          <img src={item.photo} alt="" />
                        </div>
                        <div className="userProfileInfo">
                          <h4>{item.username}</h4>
                        </div>
                      </div>
                      {concateBlock.includes(item.id + data.uid) ||
                      concateBlock.includes(data.uid + item.id) ? (
                        <p className="friendB">Blocked</p>
                      ) : concateFriend.includes(item.id + data.uid) ||
                        concateFriend.includes(data.uid + item.id) ? (
                        <p className="friendP">Member</p>
                      ) : (
                        <button onClick={() => handleAddMember(item)} className="groupButton">
                          Add
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="popUpButtonBox">
                    <CssButton onClick={() => setPopupType(null)}>Back</CssButton>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MygroupsList;
