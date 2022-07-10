import React from "react";
import "./style.css";

export default function Dice(props) {
  const styles={backgroundColor: props.isHeld ? "#59E391" : "#ffffff"}

  return (
    <div className="dice--face" style={styles} onClick={props.holdDice}>
      {props.value}
    </div>
  );
}
