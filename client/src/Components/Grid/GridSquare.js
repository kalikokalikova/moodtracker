import React from "react";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  square: {
    aspectRatio: "1/1",
    fontWeight: "bold",
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: (color) => color,
  },
});

function GridSquare(props) {
  const { label, energy, pleasantness, color } = props.data;
  const handleGridSquareClick = props.handleGridSquareClick;
  const style = styles(color);

  const handleClick = () => {
    handleGridSquareClick(energy, pleasantness, label, color)
  };

  return (
    <>
      <div className={style.square} onClick={handleClick}>
        {label}
      </div>
    </>
  );
}

export default GridSquare;
