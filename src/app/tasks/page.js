import React from "react";
import "./page.scss";
import Navbar from "../components/Navbar/Navbar";
import List from "../components/List/List";
import AddTasks from "../components/AddTasks/AddTasks";
import Image from "next/image";

export default function Tasks() {
  return (
    <div className="tasks">
      <Navbar title="TASKS" subtitle="Control" />
      <AddTasks />
      <Image src="/images/break.png" width={91} height={26} alt="break" />

      <div className="tasks__tasks">
        <List />
      </div>
    </div>
  );
}
