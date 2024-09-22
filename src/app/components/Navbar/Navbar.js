"use client";
import React from "react";
import "./Navbar.scss";
import { logout } from "../../../../public/utils/firebase";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../../contexts/AuthContext";

const Navbar = ({ title, subtitle }) => {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  return (
    <div className="navbar">
      <div className="navbar__title">
        <h3>{title}</h3>
      </div>
      <div className="navbar__subtitle">
        <p>{subtitle}</p>
      </div>
      {user ? <button onClick={handleLogout}>Logout</button> : ""}
    </div>
  );
};

export default Navbar;
