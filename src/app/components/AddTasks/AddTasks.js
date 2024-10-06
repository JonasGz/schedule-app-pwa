"use client";
import React, { useState, useRef } from "react";
import "./AddTasks.scss";
import { IoMdAddCircle } from "react-icons/io";
import { addTask } from "../../../../public/utils/indexedDb";
import { addTaskToFirestore } from "../../../../public/utils/firebase";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import "./DatePicker/DatePicker.scss";
import "./DatePicker/Calendar/Calendar.scss";

const AddTasks = ({ setAtt }) => {
  const [taskName, setTaskName] = useState("");
  const [taskTime, setTaskTime] = useState("11:11");
  const [taskDate, setTaskDate] = useState(new Date());

  function changeTaskName(e) {
    setTaskName(e.target.value);
  }
  function changeTaskTime(e) {
    setTaskTime(e.target.value);
  }
  function changeTaskDate(e) {
    setTaskDate(e);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (taskDate && taskTime && taskName) {
        const date = new Date(taskDate);
        const formattedDate = date.toLocaleDateString("pt-br");
        const newTask = {
          id: Date.now(),
          taskName,
          taskTime,
          taskDate: formattedDate,
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

          <DatePicker
            clearIcon={null}
            locale="pt-BR"
            format="dd/MM/y"
            onChange={changeTaskDate}
            value={taskDate}
          />

          {/* <input
            className="add-tasks__input add-tasks__input-date-time"
            type="date"
            name="date"
            onChange={changeTaskDate}
            value={taskDate}
          /> */}
        </div>
      </div>
      <button className="add-tasks__button">
        <IoMdAddCircle className="add-tasks__add" size={46} fill="#502F7E" />
      </button>
    </form>
  );
};

export default AddTasks;
