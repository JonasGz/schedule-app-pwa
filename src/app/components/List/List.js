"use client";
import { React, useEffect } from "react";
import "./List.scss";
import Tile from "../Tile/Tile";
import { useTask } from "../../../../contexts/TaskContext";

const List = ({ concluded, tasks }) => {
  return concluded ? (
    <ul className="list">
      <Tile title="Reunião X" time="10:11h" completed={true} />
      <Tile title="Reunião X" time="10:11h" completed={true} />
      <Tile title="Reunião X" time="10:11h" completed={true} />
      <Tile title="Reunião X" time="10:11h" completed={true} />
    </ul>
  ) : (
    <ul className="list">
      {tasks.map((task) => (
        <Tile key={task.id} title={task.taskName} time={task.taskTime} />
      ))}
    </ul>
  );
};

export default List;
