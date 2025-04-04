"use client";
import React from "react";
import "./Navbar.scss";
import HamburgerMenu from "../Menu/Menu";
import Image from "next/image";

const Navbar = ({ title, subtitle }) => {

  const handleDarkMode = () => {
    document.body.classList.toggle('dark')
  }

  return (
    <div className="navbar">
      <div className="navbar__left">
        <div className="navbar__drawer">
          <HamburgerMenu />
        </div>
        <div className="navbar__group2">
          <div className="navbar__title">
            <h3>{title}</h3>
          </div>
          <div className="navbar__subtitle">
            <p>{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="navbar__right">
        <div onClick={handleDarkMode} className="navbar__container-dark-mode">
          <Image className="navbar__dark-mode" src='/images/darkmode.svg' width={20} height={20} alt="dark-mode" /> Dark
        </div>
        
      </div>
      
    </div>
  );
};

export default Navbar;
