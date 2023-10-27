import React from 'react';

const Navbar = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#333' }}>
      <div>
        <button style={{ margin: '0 10px' }}>Calendar</button>
        <button style={{ margin: '0 10px' }}>Shows</button>
        <button style={{ margin: '0 10px' }}>Profile</button>
      </div>
      <div>
        <img src="URL_DE_VOTRE_IMAGE" alt="Profil" style={{ width: '40px', borderRadius: '50%' }} />
      </div>
    </div>
  );
}

export default Navbar;