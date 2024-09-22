"use client";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import List from "../components/List/List";
import "./page.scss";
import { useAuth } from "../../../contexts/AuthContext";

export default function Dashboard() {
  const { name } = useAuth();
  return (
    <div className="dashboard">
      <Navbar title="DASHBOARD" subtitle="Welcome" />
      <div className="dashboard__user">
        <div className="dashboard__welcome">
          <span className="dashboard__hello">Hello,</span>
          <h3 className="dashboard__username">{name}</h3>
        </div>
        <Image src="/images/avatar.png" width={129} height={126} alt="Avatar" />
      </div>

      <div className="dashboard__tasks">
        <List concluded={true} />
      </div>
    </div>
  );
}
