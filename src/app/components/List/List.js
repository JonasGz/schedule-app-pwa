"use client";
import { React, useEffect, useState } from "react";
import "./List.scss";
import Tile from "../Tile/Tile";

const List = ({ concluded, tasks }) => {
  const [tasksFuture, setTasksFuture] = useState([]);
  const [tasksToday, setTasksToday] = useState([]);
  const [tasksTodayPasseds, setTasksTodayPasseds] = useState([]);

  const [tasksPasseds, setTasksPasseds] = useState([]);

  const completedTasks = tasks.filter((task) => task.completed);
  const toDoTasks = tasks.filter((task) => !task.completed);

  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    return `${hours}:${minutes}`;
  }

  function filterTasksTimeToday(tasks) {
    const currentTime = getCurrentTime();
    const filteredTasks = tasks.filter((task) => task.taskTime >= currentTime);

    const sortedTasks = filteredTasks.sort((a, b) => {
      const timeA = a.taskTime
        .split(":")
        .reduce((acc, time) => 60 * acc + +time);
      const timeB = b.taskTime
        .split(":")
        .reduce((acc, time) => 60 * acc + +time);
      const currentTimeInMinutes = currentTime
        .split(":")
        .reduce((acc, time) => 60 * acc + +time);

      return (
        Math.abs(timeA - currentTimeInMinutes) -
        Math.abs(timeB - currentTimeInMinutes)
      );
    });

    return sortedTasks;
  }

  function filterTasks(tasks) {
    const currentDate = new Date().toLocaleDateString("pt-br");
    const currentTime = getCurrentTime();

    const futureTasks = tasks.filter((task) => {
      return task.taskDate > currentDate;
    });
    const todayTasks = tasks.filter((task) => {
      return task.taskDate === currentDate;
    });
    const todayTasksPassed = todayTasks.filter((task) => {
      return task.taskTime < currentTime;
    });
    const passedTasks = tasks.filter((task) => {
      return (
        task.taskDate < currentDate ||
        (task.taskTime < currentTime && task.taskDate === currentDate)
      );
    });

    setTasksFuture(futureTasks);
    setTasksToday(filterTasksTimeToday(todayTasks));
    setTasksTodayPasseds(todayTasksPassed);
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
      {tasksTodayPasseds &&
        tasksTodayPasseds.map((task) => (
          <Tile
            key={task.id}
            id={task.id}
            title={task.taskName}
            time={task.taskTime}
            date={task.taskDate}
            completed={false}
            passed={true}
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
