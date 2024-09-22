import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineRemoveCircle } from "react-icons/md";
import "./Tile.scss";

const Tile = ({ title, time, completed }) => {
  return completed ? (
    <li className="tile tile--completed">
      <div className="tile__title">{title}</div>
      <div className="tile__subtitle">{time}</div>
      <div className="tile__icon">
        <IoCloseCircle fill="#fff" size={38} />
      </div>
    </li>
  ) : (
    <li className="tile">
      <div className="tile__title">{title}</div>
      <div className="tile__subtitle">{time}</div>
      <div className="tile__icon">
        <BsCheckCircleFill fill="#502F7E" size={32} />
        <MdOutlineRemoveCircle fill="#BB271A" size={38} />
      </div>
    </li>
  );
};

export default Tile;
