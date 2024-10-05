"use client";
import React, { useState } from "react";
import "./AddTasks.scss";
import { IoMdAddCircle } from "react-icons/io";
import { addTask } from "../../../../public/utils/indexedDb";
import { addTaskToFirestore } from "../../../../public/utils/firebase";

const AddTasks = ({ setAtt }) => {
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("11:11");
  const [taskDate, setTaskDate] = useState("05/10/2024");

  function changeTaskName(e) {
    setTaskName(e.target.value);
  }
  function changeTaskTime(e) {
    setTaskTime(e.target.value);
  }
  function changeTaskDate(e) {
    setTaskDate(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let newDate = taskDate;
      if (taskDate) {
        const [year, month, day] = taskDate.split("-");
        const correctDate = new Date(year, month - 1, day, 12);
        newDate = correctDate.toLocaleDateString("pt-br");
      }

      if (newDate && taskTime && taskName) {
        const newTask = {
          id: Date.now(),
          taskName,
          taskTime,
          taskDate: newDate,
        };

        if (newTask) {
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
        } else {
          console.log("Sem NewTask");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="add-tasks">
      <div className="add-tasks__inputs">
        <input
          className="add-tasks__input"
          type="text"
          name="title"
          placeholder="Reunião X"
          onChange={changeTaskName}
          value={taskName}
        />
        <div className="add-tasks__date-time">
          <input
            className="add-tasks__input add-tasks__input-date-time"
            type="time"
            name="time"
            onChange={changeTaskTime}
            value={taskTime}
          />
          <input
            className="add-tasks__input add-tasks__input-date-time"
            type="text"
            placeholder="05/10/2024"
            name="date"
            onClick={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onChange={changeTaskDate}
            value={taskDate}
          />
        </div>
      </div>
      <button className="add-tasks__button">
        <IoMdAddCircle className="add-tasks__add" size={46} fill="#502F7E" />
      </button>
    </form>
  );
};

export default AddTasks;
