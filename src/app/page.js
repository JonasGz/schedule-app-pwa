"use client";
import React from "react";
import "./page.scss";
import Form from "./components/Form/Form";

export default function Home() {
  return (
    <div className="login">
      <div className="login__navbar">
        <div className="login__navbar-title">
          <h3>LOGIN</h3>
        </div>
        <div className="login__navbar-subtitle">
          <p>Authentication</p>
        </div>
      </div>
      <div className="login__form">
        <Form />
      </div>
    </div>
  );
}
