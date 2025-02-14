import React, { useState } from "react";
import "./Keypad.css";

function Keypad(props) {
  const [keys, setKeys] = useState([
    { keyCode: 55, label: "7" },
    { keyCode: 56, label: "8" },
    { keyCode: 57, label: "9" },
    { keyCode: 52, label: "4" },
    { keyCode: 53, label: "5" },
    { keyCode: 54, label: "6" },
    { keyCode: 49, label: "1" },
    { keyCode: 50, label: "2" },
    { keyCode: 51, label: "3" },
    { keyCode: 48, label: "0" },
    { keyCode: 190, label: "." },
    { keyCode: 13, label: "=" },
  ]);

  const [symbols, setSymbols] = useState([
    { label: "⌫", keyCode: 8, value: "backspace" },
    { label: "÷", keyCode: 111, value: "/" },
    { label: "×", keyCode: 56, value: "*" },
    { label: "﹣", keyCode: 109, value: "-" },
    { label: "+", keyCode: 107, value: "+" },
  ]);

  const handleDragStart = (event, index, type) => {
    event.dataTransfer.setData("index", index);
    event.dataTransfer.setData("type", type);
  };

  const handleDrop = (event, dropIndex, type) => {
    event.preventDefault();
    const dragIndex = event.dataTransfer.getData("index");
    const dragType = event.dataTransfer.getData("type");

    if (dragType !== type) return; // Ensure we drop within the same section

    let updatedList = type === "keys" ? [...keys] : [...symbols];
    const draggedItem = updatedList[dragIndex];

    updatedList.splice(dragIndex, 1); // Remove dragged item
    updatedList.splice(dropIndex, 0, draggedItem); // Insert at new position

    type === "keys" ? setKeys(updatedList) : setSymbols(updatedList);
  };

  return (
    <div className="keypad">
      <div className="keypad_keys">
        {keys.map((item, index) => (
          <p
            key={index}
            draggable
            onDragStart={(event) => handleDragStart(event, index, "keys")}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, index, "keys")}
            onClick={() => props.handleKeyPress(item.keyCode, item.label)}
          >
            {item.label}
          </p>
        ))}
      </div>
      <div className="keypad_symbols">
        {symbols.map((item, index) => (
          <p
            key={index}
            draggable
            onDragStart={(event) => handleDragStart(event, index, "symbols")}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => handleDrop(event, index, "symbols")}
            onClick={() => props.handleKeyPress(item.keyCode, item.value)}
          >
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Keypad;
