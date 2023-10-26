import React from "react";
import "./profile.css";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  function handleChange() {}
  function handleClick() {}
  return (
    <div>
      {/*div>ly log in as: {currentTarget.email.value} </div>*/}
      <input type="file" onChange={handleChange} placeholder="File" />
      <button onClick={handleClick}>Upload</button>
      <img
        src="https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
        alt="avatar"
        className="avatar"
      />
    </div>
  );
}

export default UserProfile;
