import React from "react";
import "./Navbar.scss";

const Navbar = ({ title, subtitle }) => {
  return (
    <div className="navbar">
      <div className="navbar__title">
        <h3>{title}</h3>
      </div>
      <div className="navbar__subtitle">
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Navbar;
