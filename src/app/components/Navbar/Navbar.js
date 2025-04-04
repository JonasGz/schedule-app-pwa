"use client";
import React from "react";
import "./Navbar.scss";
import { logout } from "../../../../public/utils/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../contexts/AuthContext";
import HamburgerMenu from "../Menu/Menu";
import Image from "next/image";

const Navbar = ({ title, subtitle }) => {
  const router = useRouter();
  const { user } = useAuth();

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
          <Image className="navbar__dark-mode" src='/images/dark-mode.svg' width={25} height={25} alt="dark-mode" />
        </div>
        
      </div>
      
    </div>
  );
};

export default Navbar;
