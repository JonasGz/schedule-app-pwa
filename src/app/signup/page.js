"use client";
import React from "react";
import "./page.scss";
import Form from "../components/Form/Form";
import Navbar from "../components/Navbar/Navbar";
import { MdAccountCircle } from "react-icons/md";

export default function Signup() {
  return (
    <div className="signup">
      <Navbar title="SIGN UP" subtitle="Register" />
      <div className="signup__icon">
        <MdAccountCircle fill="white" size={92} />
      </div>

      <div className="signup__form">
        <Form />
      </div>
    </div>
  );
}
