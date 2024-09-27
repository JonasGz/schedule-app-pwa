"use client";
import React from "react";
import "./Navbar.scss";
import { logout } from "../../../../public/utils/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../contexts/AuthContext";
import HamburgerMenu from "../Menu/Menu";

const Navbar = ({ title, subtitle }) => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <div className="navbar">
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
  );
};

export default Navbar;
