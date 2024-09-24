"use client";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineRemoveCircle } from "react-icons/md";
import "./Tile.scss";
import {
  getTasks,
  openIndexedDB,
  removeTask,
  concludedTask,
  notConcludedTask,
} from "../../../../public/utils/indexedDb";
import { useTask } from "../../../../contexts/TaskContext";

const Tile = ({ title, time, completed, id }) => {
  const { setAtt } = useTask();

  const completedTask = (id) => {
    concludedTask(id);
    setAtt((a) => a + 1);
  };

  const notCompletedTask = (id) => {
    notConcludedTask(id);
    setAtt((a) => a + 1);
  };

  const deleteTask = (id) => {
    removeTask(id);
    setAtt((a) => a + 1);
  };

  return completed ? (
    <li className="tile tile--completed">
      <div className="tile__title">{title}</div>
      <div className="tile__subtitle">{time}</div>
      <div className="tile__icon">
        <IoCloseCircle
          onClick={() => notCompletedTask(id)}
          fill="#fff"
          size={38}
        />
      </div>
    </li>
  ) : (
    <li className="tile">
      <div className="tile__title">{title}</div>
      <div className="tile__subtitle">{time}</div>
      <div className="tile__icon">
        <BsCheckCircleFill
          onClick={() => completedTask(id)}
          fill="#502F7E"
          size={32}
        />
        <MdOutlineRemoveCircle
          onClick={() => deleteTask(id)}
          fill="#BB271A"
          size={38}
        />
      </div>
    </li>
  );
};

export default Tile;
