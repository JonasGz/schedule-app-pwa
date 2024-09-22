import React from "react";
import "./List.scss";
import Tile from "../Tile/Tile";

const List = ({ concluded }) => {
  return concluded ? (
    <ul className="list">
      <Tile title="Reunião X" time="10:11h" completed={true} />
      <Tile title="Reunião X" time="10:11h" completed={true} />
      <Tile title="Reunião X" time="10:11h" completed={true} />
      <Tile title="Reunião X" time="10:11h" completed={true} />
    </ul>
  ) : (
    <ul className="list">
      <Tile title="Reunião X" time="10:11h" />
      <Tile title="Reunião X" time="10:11h" />
      <Tile title="Reunião X" time="10:11h" />
      <Tile title="Reunião X" time="10:11h" />
    </ul>
  );
};

export default List;
