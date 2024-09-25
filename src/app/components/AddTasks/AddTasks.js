"use client";
import React, { useState } from "react";
import "./AddTasks.scss";
import { IoMdAddCircle } from "react-icons/io";
import { addTask } from "../../../../public/utils/indexedDb";
import { addTaskToFirestore } from "../../../../public/utils/firebase";

const AddTasks = ({ setAtt }) => {
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("");

  function changeTaskName(e) {
    setTaskName(e.target.value);
  }
  function changeTaskTime(e) {
    setTaskTime(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      taskName,
      taskTime,
    };

    try {
      await addTask(newTask);
      setAtt((a) => a + 1);
      if (navigator.onLine) {
        await addTaskToFirestore(newTask);
        setAtt((a) => a + 1);
      }
    } catch (error) {
      console.error("Erro ao adicionar nova tarefa:", error);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="add-tasks">
      <input
        className="add-tasks__input"
        type="text"
        name="title"
        placeholder="Reunião X"
        onChange={changeTaskName}
        value={taskName}
      />
      <input
        className="add-tasks__input"
        type="time"
        name="time"
        onChange={changeTaskTime}
        value={taskTime}
      />
      <button className="add-tasks__button">
        <IoMdAddCircle size={46} fill="#502F7E" />
      </button>
    </form>
  );
};

export default AddTasks;
