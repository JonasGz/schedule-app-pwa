"use client";
import React from "react";
import "./page.scss";
import Form from "./components/Form/Form";
import Navbar from "./components/Navbar/Navbar";
import { MdLock } from "react-icons/md";

export default function Home() {
  return (
    <div className="login">
      <Navbar title="LOGIN" subtitle="Authentication" />
      <div className="login__icon">
        <h3>Welcome</h3>
        <span className="login__text-icon">Enter your details below</span>
      </div>

      <div className="login__form">
        <div className="login__container-form">
          <Form type="login" />
        </div>
        <div className="login__container-shadow"></div>
      </div>
    </div>
  );
}
