import React from 'react'
import Group1 from "../assets/group1.png";

const SingleUser = ({userTitle,message,buttonName}) => {
  return (
    <div className="userProfileBody">
        <div className="profileBodyBox">
            <div className="otherProfileImage">
                <img src={Group1} alt="" />
            </div>
            <div className="userProfileInfo">
                <h4>{userTitle}</h4>
                <p>{message}</p>
            </div>
        </div>
        <button className="">{buttonName}</button>
    </div>
  )
}

export default SingleUser