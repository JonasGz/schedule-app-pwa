"use client";
import React, { useState, useEffect, useRef } from "react";
import "./Menu.scss";
import { useRouter, usePathname } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdAddBox } from "react-icons/md";
import { IoMdList } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { SiGnuprivacyguard } from "react-icons/si";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../../../../contexts/AuthContext";
import Link from "next/link";
import { logout } from "../../../../public/utils/firebase";
// import { Transition } from "../Transition/Transition";

function HamburgerMenu() {
  const auth = getAuth();
  const { logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (auth.currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

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
    router.push("/");
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
            <RiLogoutBoxLine size={20} />
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
