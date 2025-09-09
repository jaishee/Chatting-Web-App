import React, { createRef, useEffect, useRef, useState } from "react";
import Profile from "../assets/Profile.png";
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeUserDetails } from "../slices/userInfoSlice";
import { FaCloudUploadAlt } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

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

  let handleUpdateProfileImage = () => {
    setVisiblePopUp(true);
  };
  let handleBackToHome = () => {
    setVisiblePopUp(false);
  };
  let handlePopUpImg = (e) => {
    if (!popUpref.current.contains(e.target)) {
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
  });
  console.log(activeValue);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
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
        <div onClick={handleUpdateProfileImage} className="profileImage">
          <img src={Profile} alt="Profile Picture" />
          <div className="overlay">
            <FaCloudUploadAlt />
          </div>
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
              {
                image 
                &&
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
              }
              <input type="file" onChange={onChange} />
              <div className="popUpButtonBox">
                <CssButton onClick={handleBackToHome} variant="contained">
                  Back
                </CssButton>
                <CssButton variant="contained">Update</CssButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SideBar;
