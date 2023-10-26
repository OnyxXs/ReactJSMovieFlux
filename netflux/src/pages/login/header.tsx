import React from 'react';
import './header.css';

const Header: React.FC = () => {
  return (
    <header>
        <nav className="navbar">
            <div className="image">
                <img src="https://cdn.discordapp.com/attachments/1166370986355064844/1167096613408342127/AddText_10-25-03.21.23_1.png?ex=654ce26c&is=653a6d6c&hm=e4d407e6ccfef0d592f1c0e8dfdc532057fadb389ac75fc31db01f7758baf390&" alt="Image navbar"/>
            </div>
            <div className="divnav">

                <div className="dropdown">
                    <button className="dropdown-btn">Menu</button>
                    <div className="dropdown-content">
                        <a href="#">Account</a>
                        <a href="#">About us</a>
                        <a href="#">Logout</a>
                    </div>
                </div>

            </div>
        </nav>
    </header>
  );
};

export default Header;