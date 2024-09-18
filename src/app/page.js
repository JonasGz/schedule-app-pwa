"use client";
import React from "react";
import "./page.scss";
import Form from "./components/Form/Form";

export default function Home() {
  return (
    <div className="login">
      <div className="login__form">
        <Form />
      </div>
    </div>
  );
}
