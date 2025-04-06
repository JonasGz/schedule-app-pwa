"use client";
import React from "react";
import "./page.scss";
import Form from "../components/Form/Form";
import Navbar from "../components/Navbar/Navbar";

export default function Signup() {
  return (
    <div className="signup">
      <Navbar title="SIGN UP" subtitle="Register" />
      <div className="signup__icon">
        <h3>Get started!</h3>
        <span className="signup__text-icon">Free forever</span>
      </div>

      <div className="signup__form">
        <div className="signup__container-form">
          <Form type="signup" />
        </div>
        <div className="signup__container-shadow"></div>
      </div>
    </div>
  );
}
