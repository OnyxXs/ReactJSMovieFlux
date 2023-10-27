import React from 'react';
import "../navbar.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <div>
                <img src="https://media.discordapp.net/attachments/1166370986355064844/1167096613408342127/AddText_10-25-03.21.23_1.png?ex=654ce26c&is=653a6d6c&hm=e4d407e6ccfef0d592f1c0e8dfdc532057fadb389ac75fc31db01f7758baf390&=&width=1920&height=257" alt="Profil" className="logo" />
            </div>
            <div>
                
                <div className="dropdown">
                    <button className="dropdown-btn">Profile</button>
                    <div className="dropdown-content">
                        <a href="#">Profile</a>
                        <a href="#">Log out</a>
                    </div>
                </div>
                
                <button>About us</button>
            </div>
            
        </div>
    );
  }

export default Navbar;