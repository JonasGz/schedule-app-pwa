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

  function filterTasks(tasks) {
    const currentDate = new Date().toLocaleDateString("pt-br");
    const currentTime = getCurrentTime();

    const futureTasks = tasks.filter((task) => {
      return task.taskDate > currentDate && !task.completed;
    });
    const todayTasks = tasks.filter((task) => {
      return task.taskDate === currentDate && !task.completed;
    });

    function orderedTasksTodayTime(todayTasks) {
      const nextTasks = todayTasks.filter(
        (task) => task.taskTime >= currentTime
      );
      const sortedTasks = nextTasks.sort((a, b) => {
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
    const todayTasksPassed = todayTasks.filter((task) => {
      return task.taskTime < currentTime && !task.completed;
    });
    const passedTasks = tasks.filter((task) => {
      return (
        task.taskDate < currentDate ||
        (task.taskTime < currentTime &&
          task.taskDate === currentDate &&
          !task.completed)
      );
    });

    setTasksFuture(futureTasks);
    setTasksToday(orderedTasksTodayTime(todayTasks));
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
      <h3 className="list__title">Future</h3>
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

      <h3 className="list__title">Today</h3>

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
      <h3 className="list__title">Passeds</h3>

      {tasksPasseds &&
        tasksPasseds.map((task) => (
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
    </ul>
  );
};

export default List;
