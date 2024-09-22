import React from "react";
import "./AddTasks.scss";
import { IoMdAddCircle } from "react-icons/io";

const AddTasks = () => {
  return (
    <form className="add-tasks">
      <input
        className="add-tasks__input"
        type="text"
        name="title"
        placeholder="Reunião X"
      />
      <input className="add-tasks__input" type="time" name="time" />
      <button className="add-tasks__button">
        <IoMdAddCircle size={46} fill="#502F7E" />
      </button>
    </form>
  );
};

export default AddTasks;
