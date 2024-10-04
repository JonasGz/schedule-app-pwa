"use client";
import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineRemoveCircle } from "react-icons/md";
import "./Tile.scss";
import {
  removeTask,
  notConcludedTask,
  concludedTaskIndexedDB,
} from "../../../../public/utils/indexedDb";
import { useTask } from "../../../../contexts/TaskContext";
import {
  concludedTaskFirestore,
  notConludedTaksFirestore,
  removeTaskFromFirestore,
} from "../../../../public/utils/firebase";

const Tile = ({ title, time, completed, id, date }) => {
  const { setAtt } = useTask();

  const completedTask = async (id) => {
    await concludedTaskIndexedDB(id);
    await concludedTaskFirestore(id);
    setAtt((a) => a + 1);
  };

  const notCompletedTask = async (id) => {
    await notConcludedTask(id);
    await notConludedTaksFirestore(id);
    setAtt((a) => a + 1);
  };

  const deleteTask = async (id) => {
    await removeTask(id);
    if (navigator.onLine) {
      await removeTaskFromFirestore(id);
    }
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
      <div className="tile__subtitle">
        {time}h - {date}
      </div>
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
