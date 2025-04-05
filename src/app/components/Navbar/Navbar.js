"use client";
import React from "react";
import "./Navbar.scss";
import HamburgerMenu from "../Menu/Menu";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { logout } from "../../../../public/utils/firebase";
import { useAuth } from "../../../../contexts/AuthContext";

const Navbar = ({ title, subtitle }) => {

  const {user} = useAuth();

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
      {user && <div onClick={() => logout()} className="navbar__logout">
        <LogOut stroke="black" size={20} />
      </div>}
        <div onClick={handleDarkMode} className="navbar__container-dark-mode">
          <Image className="navbar__dark-mode" src='/images/darkmode.svg' width={20} height={20} alt="dark-mode" /> Dark
        </div>
      </div>
    </div>
  );
};

export default Navbar;
