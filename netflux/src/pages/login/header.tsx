import React from 'react';

const Header: React.FC = () => {
  return (
    <header>
      <h1>Mon Site Web</h1>
      <nav>
        <ul>
          <li><a href="page1.html">Page 1</a></li>
          <li><a href="page2.html">Page 2</a></li>
          {/* Ajoutez d'autres liens de navigation au besoin */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;