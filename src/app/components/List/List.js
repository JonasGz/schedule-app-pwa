"use client";
import { React, useEffect, useState } from "react";
import "./List.scss";
import Tile from "../Tile/Tile";

const List = ({ concluded, tasks }) => {
  const [tasksToday, setTasksToday] = useState("");
  const completedTasks = tasks.filter((task) => task.completed);
  const toDoTasks = tasks.filter((task) => !task.completed);

  // function todayTasks(tasks) {
  //   const currentDate = new Date().toISOString().split("T")[0];
  //   console.log(currentDate);
  //   const todayTasks = tasks.filter((task) => {
  //     return (task.taskDate = currentDate);
  //   });
  //   setTasksToday(todayTasks);
  // }

  // useEffect(() => {
  //   tasksToday(tasks);
  // }, [tasks]);

  return concluded ? (
    <ul className="list">
      {completedTasks.map((task) => (
        <Tile
          key={task.id}
          id={task.id}
          title={task.taskName}
          time={task.taskTime}
          date={task.taskDate}
          completed={true}
        />
      ))}
    </ul>
  ) : (
    <ul className="list">
      {toDoTasks.map((task) => (
        <Tile
          key={task.id}
          id={task.id}
          title={task.taskName}
          time={task.taskTime}
          date={task.taskDate}
          completed={false}
        />
      ))}
    </ul>
  );
};

export default List;
