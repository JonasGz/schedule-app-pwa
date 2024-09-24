"use client";
import { React } from "react";
import "./List.scss";
import Tile from "../Tile/Tile";

const List = ({ concluded, tasks }) => {
  const completedTasks = tasks.filter((task) => task.completed);
  const toDoTasks = tasks.filter((task) => !task.completed);

  return concluded ? (
    <ul className="list">
      {completedTasks.map((task) => (
        <Tile
          key={task.id}
          id={task.id}
          title={task.taskName}
          time={task.taskTime}
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
          completed={false}
        />
      ))}
    </ul>
  );

  // return <ul className="list">{tasks.filter((task) => task.completed)}</ul>;

  // return concluded ? (
  //   <ul className="list">
  //     <Tile title="Reunião X" time="10:11h" completed={true} />
  //     <Tile title="Reunião X" time="10:11h" completed={true} />
  //     <Tile title="Reunião X" time="10:11h" completed={true} />
  //     <Tile title="Reunião X" time="10:11h" completed={true} />
  //   </ul>
  // ) : (
  //   <ul className="list">
  //     {tasks.map((task) => (
  //       <Tile
  //         key={task.id}
  //         id={task.id}
  //         title={task.taskName}
  //         time={task.taskTime}
  //         completed={false}
  //       />
  //     ))}
  //   </ul>
  // );
};

export default List;
