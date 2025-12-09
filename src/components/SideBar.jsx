import React, { createRef, useEffect, useRef, useState } from "react";
import Profile from "../assets/Profile.png";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { removeUserDetails, userDetails } from "../slices/userInfoSlice";
import { FaCloudUploadAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";

const CssButton = styled(Button)({
  width: "120px",
  height: "55px",
  borderRadius: "20px",
  background: "#5F35F5",
  padding: "19px 0px",
  fontSize: "21px",
  fontFamily: '"Open Sans", sans-serif',
  textTransform: "capitalize",
  marginTop: "15px",
});

const SideBar = () => {
  const storage = getStorage();
  const auth = getAuth();
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let location = useLocation();
  let [activeValue, setActiveValue] = useState("");
  let [visiblePopUp, setVisiblePopUp] = useState(false);
  let popUpref = useRef(null);
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  const data = useSelector((state) => state.activeUser.value);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

      const storageRef = ref(storage, auth.currentUser.uid);

      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then((snapshot) => {
        console.log("Uploaded a data_url string!");
        toast.success("Successfully Update!");
      });
      getDownloadURL(storageRef).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          }).then(() => {
            setImage("")
            setVisiblePopUp(false)
            setCropData("")
            dispatch(userDetails({...data,photoURL:downloadURL}))
            localStorage.setItem("userinfo",JSON.stringify({...data,photoURL:downloadURL}))
          });
      });
    }
  };

  let handleUpdateProfileImage = () => {
    setVisiblePopUp(true);
  };

  let handleBackToHome = () => {
    setVisiblePopUp(false);
  };

  let handlePopUpImg = (e) => {
    if (popUpref.current && !popUpref.current.contains(e.target)) {
  setVisiblePopUp(false);
}

  };

  let handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUserDetails());
        localStorage.removeItem("userinfo");
        toast.success("Successfully Logout!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  useEffect(() => {
    setActiveValue(location.pathname.replace("/pages/", ""));
  },[location.pathname])


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="sideBar">
        <div className="profile">
          <div onClick={handleUpdateProfileImage} className="profileImage">
            <img src={data.photoURL} alt="Profile Picture" />
            <div className="overlay">
              <FaCloudUploadAlt />
            </div>
          </div>
          <h4 className="userName">{data.displayName}</h4>
        </div>

        <div className="elements">
          <Link
            to="/pages/home"
            className={`commonIconLink ${
              activeValue === "home" ? "active" : ""
            }`}
          >
            <IoHomeOutline className="commonIcon" />
          </Link>

          <Link
            to="/pages/message"
            className={`commonIconLink ${
              activeValue === "message" ? "active" : ""
            }`}
          >
            <LuMessageCircleMore className="commonIcon" />
          </Link>

          <Link
            to="/pages/notification"
            className={`commonIconLink ${
              activeValue === "notification" ? "active" : ""
            }`}
          >
            <IoMdNotificationsOutline className="commonIcon" />
          </Link>

          <Link
            to="/pages/setting"
            className={`commonIconLink ${
              activeValue === "setting" ? "active" : ""
            }`}
          >
            <IoSettingsOutline className="commonIcon" />
          </Link>
        </div>

        <div className="logout">
          <RiLogoutBoxLine
            onClick={handleLogout}
            className="commonIcon logoutIcon"
          />
        </div>
        {visiblePopUp && (
          <div onClick={handlePopUpImg} className="popUpImg">
            <div ref={popUpref} className="popUpImgBox">
              <h1>Update Your Profile Picture</h1>

              <div className="preview-box">
                <div className="img-preview preview-round"></div>
              </div>
              {image && (
                <Cropper
                  ref={cropperRef}
                  style={{ height: 400, width: "100%" }}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false}
                  guides={true}
                />
              )}
              <input type="file" onChange={onChange} />
              <div className="popUpButtonBox">
                <CssButton onClick={handleBackToHome} variant="contained">
                  Back
                </CssButton>
                <CssButton onClick={getCropData} variant="contained">
                  Update
                </CssButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
