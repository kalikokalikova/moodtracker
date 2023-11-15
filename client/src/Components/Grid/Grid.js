import React from "react";
import GridSquare from "./GridSquare";
import { createUseStyles } from "react-jss";
import GridData from "./GridData";

const styles = createUseStyles({
  squareContainer: {
    display: 'grid',  // Set display property to 'grid'
    gridTemplateColumns: 'repeat(6, 1fr)', // You can adjust the number of columns as needed
    gap: '8px', // Adjust the gap between squares
  },
});

function Grid() {
  const style = styles();
  return (
    <>
      <div className={style.squareContainer}>
        {GridData.map((data, index) => (
          <div key={index}><GridSquare data={data}/></div>
        ))}
      </div>
    </>
  );
}

export default Grid;
