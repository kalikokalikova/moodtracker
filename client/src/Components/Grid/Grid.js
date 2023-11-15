import React from "react";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  squareContainer: {
    display: 'grid',  // Set display property to 'grid'
    gridTemplateColumns: 'repeat(6, 1fr)', // You can adjust the number of columns as needed
    gap: '8px', // Adjust the gap between squares
  },

  square: {
    border: '1px solid',
    aspectRatio: '1/1',
  },
});

function Grid() {
  const style = styles();
  return (
    <>
      <div className={style.squareContainer}>
        <div className={style.square}>fee</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>fee</div>
        <div className={style.square}>fee</div>

        <div className={style.square}>fee</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>fee</div>
        <div className={style.square}>fee</div>

        <div className={style.square}>fee</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>fee</div>
        <div className={style.square}>fee</div>

        <div className={style.square}>fee</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>fee</div>
        <div className={style.square}>fee</div>

        <div className={style.square}>fee</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>fee</div>
        <div className={style.square}>fee</div>

        <div className={style.square}>fee</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>foo</div>
        <div className={style.square}>fee</div>
        <div className={style.square}>fee</div>
      </div>
    </>
  );
}

export default Grid;
