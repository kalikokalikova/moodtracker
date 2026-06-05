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
    textAlign: 'center',
    maxWidth: '175px',
    backgroundColor: (color) => color,
    '&:hover': {
      cursor: "pointer",
    },
    '@media (max-width: 950px)': {
      fontSize: '11px',
    },
    '@media (max-width: 780px)': {
      fontSize: '9px',
      padding: 0,
    fontWeight: 'normal',
    },
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
