import React from 'react'

function Logo() {
  return (
    <div className="logo-container">
      <img src={require("../assets/images/logo.png")} alt="Hike & Seek Supplies" className="logo" />
    </div>
  );
}

export default Logo;