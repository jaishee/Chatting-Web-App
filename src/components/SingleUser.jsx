<<<<<<< HEAD
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

=======
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

>>>>>>> b9e8630c56a59c2033918e9ea69942fe8d2bafd9
export default SingleUser