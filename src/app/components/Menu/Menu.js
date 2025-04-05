"use client";
import React, { useState, useEffect, useRef } from "react";
import "./Menu.scss";
import { usePathname } from "next/navigation";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { logout } from "../../../../public/utils/firebase";
import { useAuth } from "../../../../contexts/AuthContext";

function HamburgerMenu() {
  const {user} = useAuth()
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="menu" ref={menuRef}>
      <header className="menu__header">
        {!isOpen ? (
          <button className="menu__menu-toggle" onClick={toggleMenu}>
            ☰
          </button>
        ) : (
          <button
            style={{ opacity: 0 }}
            className="menu__menu-toggle"
            onClick={toggleMenu}
          >
            ☰
          </button>
        )}
      </header>
      <nav className={`menu__drawer ${isOpen ? "menu--open" : ""}`}>
        <div className="menu__nav-drawer">
          <button className="menu__close-btn" onClick={toggleMenu}>
            ×
          </button>
          <button onClick={handleLogout} className="menu__close-btn">
            <RiLogoutBoxLine size={22} />
          </button>
        </div>
        {!user ? (
          <ul>
            <Link href="/">
              <li
                onClick={toggleMenu}
                className={pathname === "/" ? "menu--active" : ""}
              >
                <IoLogIn size={20} />
                Login
              </li>
            </Link>

            <Link href="/signup">
              <li
                onClick={toggleMenu}
                className={pathname === "/signup" ? "menu--active" : ""}
              >
                <SiGnuprivacyguard size={18} />
                Sign Up
              </li>
            </Link>
          </ul>
        ) : (
          <ul>
            <Link href="/dashboard">
              <li
                onClick={toggleMenu}
                className={pathname === "/dashboard" ? "menu--active" : ""}
              >
                <FaHome size={20} />
                Dashboard
              </li>
            </Link>

            <Link href="/tasks">
              <li
                onClick={toggleMenu}
                className={pathname === "/tasks" ? "menu--active" : ""}
              >
                <MdAddBox size={20} />
                Tasks
              </li>
            </Link>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default HamburgerMenu;
