import React from "react";
import "../navbar.css";
import { FaCalendarAlt, FaTv, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom"; // Assurez-vous d'importer Link de react-router-dom

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left-section">
        <button>
          <FaCalendarAlt /> Calendar
        </button>
        <button>
          <FaTv /> Shows
        </button>
      </div>
      <div className="right-section">
        <Link to="/profile">
          <img
            src="https://p1.hiclipart.com/preview/386/684/972/face-icon-user-icon-design-user-profile-share-icon-avatar-black-and-white-silhouette-png-clipart.jpg"
            alt="Profile"
            className="profile-pic"
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
