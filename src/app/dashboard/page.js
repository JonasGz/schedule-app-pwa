"use client";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import List from "../components/List/List";
import "./page.scss";
import { useAuth } from "../../../contexts/AuthContext";
import { useTask } from "../../../contexts/TaskContext";
import PrivateRouter from "../components/PrivateRouter/PrivateRouter";

export default function Dashboard() {
  const { name } = useAuth();
  const { tasks } = useTask();

  return (
    <PrivateRouter>
      <div className="dashboard">
        <Navbar title="DASHBOARD" subtitle="Welcome" />
        <div className="dashboard__content">
          <div className="dashboard__user">
            <div className="dashboard__welcome">
              <span className="dashboard__hello">Hello,</span>
              <h3 className="dashboard__username">{name}</h3>
            </div>
            <Image
              className="dashboard__avatar"
              src="/images/avatarsvg.svg"
              width={129}
              height={126}
              alt="Avatar"
            />
          </div>

          <Image
            className="tasks__break"
            src="/images/break.png"
            width={91}
            height={26}
            alt="break"
          />

          <div className="dashboard__tasks">
            <List tasks={tasks} concluded={true} />
          </div>
        </div>
      </div>
    </PrivateRouter>
  );
}
