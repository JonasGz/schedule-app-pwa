"use client";
import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Image from "next/image";
import List from "../components/List/List";
import "./page.scss";
import { useAuth } from "../../../contexts/AuthContext";
import { useTask } from "../../../contexts/TaskContext";
import PrivateRouter from "../components/PrivateRouter/PrivateRouter";
import { SquarePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Navigate from "../components/Navigate/Navigate";

export default function Dashboard() {
  const { name } = useAuth();
  const { tasks } = useTask();
  const router = useRouter();

  return (
    <PrivateRouter>
      <div className="dashboard">
        <Navbar title="DASHBOARD" subtitle="Welcome" />
        <div className="dashboard__content">
          <Navigate />
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
            {tasks.length > 0 ? <List tasks={tasks} concluded={true} /> : <div onClick={() => router.push('/tasks')} className="dashboard__add-task">Add Task <SquarePlus size={28} /></div>}
          </div>
        </div>
      </div>
    </PrivateRouter>
  );
}
