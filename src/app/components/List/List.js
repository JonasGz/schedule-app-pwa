"use client";
import { React, useEffect, useState } from "react";
import "./List.scss";
import Tile from "../Tile/Tile";

const List = ({ concluded, tasks }) => {
  const [tasksFuture, setTasksFuture] = useState([]);
  const [tasksToday, setTasksToday] = useState([]);
  const [tasksPasseds, setTasksPasseds] = useState([]);

  const completedTasks = tasks.filter((task) => task.completed);
  const toDoTasks = tasks.filter((task) => !task.completed);

  function filterTasks(tasks) {
    const currentDate = new Date().toLocaleDateString("pt-br");

    const futureTasks = tasks.filter((task) => {
      return task.taskDate > currentDate;
    });
    const todayTasks = tasks.filter((task) => {
      return task.taskDate === currentDate;
    });
    const passedTasks = tasks.filter((task) => {
      return task.taskDate < currentDate;
    });

    setTasksFuture(futureTasks);
    setTasksToday(todayTasks);
    setTasksPasseds(passedTasks);
  }

  useEffect(() => {
    filterTasks(tasks);
  }, [tasks]);

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
      <h2>Future</h2>
      {tasksFuture &&
        tasksFuture.map((task) => (
          <Tile
            key={task.id}
            id={task.id}
            title={task.taskName}
            time={task.taskTime}
            date={task.taskDate}
            completed={false}
          />
        ))}

      <h2>Today</h2>

      {tasksToday &&
        tasksToday.map((task) => (
          <Tile
            key={task.id}
            id={task.id}
            title={task.taskName}
            time={task.taskTime}
            date={task.taskDate}
            completed={false}
          />
        ))}
      <h2>Passeds</h2>

      {tasksPasseds &&
        tasksPasseds.map((task) => (
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
