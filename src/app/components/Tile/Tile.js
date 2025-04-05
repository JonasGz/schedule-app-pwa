"use client";
import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineRemoveCircle } from "react-icons/md";
import "./Tile.scss";
import {
  removeTask,
  notConcludedTask,
  concludedTaskIndexedDB,
  addTask,
} from "../../../../public/utils/indexedDb";
import { useTask } from "../../../../contexts/TaskContext";
import {
  concludedTaskFirestore,
  notConludedTaksFirestore,
  removeTaskFromFirestore,
  updatedTaskFromFirestore,
} from "../../../../public/utils/firebase";
import { Pencil } from "lucide-react";


const Tile = ({ title, time, completed, id, date, passed, updateAt }) => {
  const { setAtt } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

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

  const saveEditedTitle = async () => {
    if (editedTitle.trim() && editedTitle !== title) {
      const updatedTask = {
        id: id,
        taskName: editedTitle,
        taskTime: time,
        taskDate: date,
        completed: completed ? completed : null,
        passed: passed ? passed : null,
        updateAt: new Date(),
      }
      await addTask(updatedTask)
      await updatedTaskFromFirestore(updatedTask);
      setAtt((a) => a + 1);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      saveEditedTitle();
    } else if (e.key === "Escape") {
      setEditedTitle(title);
      setIsEditing(false);
    }
  };

  return completed ? (
    <li className="tile tile--completed">
      <div className="tile__title">
      {isEditing ? (
          <input
            autoFocus
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={saveEditedTitle}
            onKeyDown={handleKeyDown}
            className="tile__input"
          />
        ) : (
          <>
            {title}
            <Pencil
              className="tile__edit-icon"
              onClick={() => setIsEditing(true)}
              size={16}
              style={{ marginLeft: "0.5rem", cursor: "pointer" }}
            />
          </>
        )}
      </div>
      <div className="tile__subtitle">
        {time}h - {date}
      </div>
      <div className="tile__icon">
        <IoCloseCircle
          className="tile__button-not-completed"
          onClick={() => notCompletedTask(id)}
          fill="#fff"
          size={28}
        />
      </div>
    </li>
  ) : passed ? (
    <li className="tile tile--passed">
      <div className="tile__title">
        {isEditing ? (
          <input
            autoFocus
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={saveEditedTitle}
            onKeyDown={handleKeyDown}
            className="tile__input"
          />
        ) : (
          <>
            {title}
            <Pencil
              className="tile__edit-icon"
              onClick={() => setIsEditing(true)}
              size={16}
              style={{ marginLeft: "0.5rem", cursor: "pointer" }}
            />
          </>
        )}</div>
      <div className="tile__subtitle">
        {time}h - {date}
      </div>
      <div className="tile__icon">
        <BsCheckCircleFill
          className="tile__button-completed"
          onClick={() => completedTask(id)}
          fill="#502F7E"
          size={28}
        />
        <MdOutlineRemoveCircle
          className="tile__button-remove"
          onClick={() => deleteTask(id)}
          fill="#BB271A"
          size={34}
        />
      </div>
    </li>
  ) : (
    <li className="tile">
      <div className="tile__title">
        {isEditing ? (
          <input
            autoFocus
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={saveEditedTitle}
            onKeyDown={handleKeyDown}
            className="tile__input"
          />
        ) : (
          <>
            {title}
            <Pencil
              className="tile__edit-icon"
              onClick={() => setIsEditing(true)}
              size={16}
              style={{ marginLeft: "0.5rem", cursor: "pointer" }}
            />
          </>
        )}</div>
      <div className="tile__subtitle">
        {time}h - {date}
      </div>
      <div className="tile__icon">
        <BsCheckCircleFill
          className="tile__button-completed"
          onClick={() => completedTask(id)}
          fill="#502F7E"
          size={28}
        />
        <MdOutlineRemoveCircle
          className="tile__button-remove"
          onClick={() => deleteTask(id)}
          fill="#BB271A"
          size={34}
        />
      </div>
    </li>
  );
};

export default Tile;
