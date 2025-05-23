"use client";

import { React } from "react";
import "./page.scss";
import Navbar from "../components/Navbar/Navbar";
import List from "../components/List/List";
import AddTasks from "../components/AddTasks/AddTasks";
import Image from "next/image";
import { useTask } from "../../../contexts/TaskContext";
import PrivateRouter from "../components/PrivateRouter/PrivateRouter";
import Navigate from "../components/Navigate/Navigate";

export default function Tasks() {
  const { tasks, setAtt } = useTask();

  return (
    <PrivateRouter>
      <div className="tasks">
        <Navbar title="TASKS" subtitle="Control" />
        <div className="tasks__content">
         <Navigate />

          <div className="tasks__add-tasks">
            <AddTasks setAtt={setAtt} />
          </div>
          <Image
            className="tasks__break"
            src="/images/break.png"
            width={91}
            height={26}
            alt="break"
          />

          <div className="tasks__tasks">
            <List tasks={tasks} setAtt={setAtt} />
          </div>
        </div>
      </div>
    </PrivateRouter>
  );
}
