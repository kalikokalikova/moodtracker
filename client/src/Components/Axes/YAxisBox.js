import React from "react";
import { Box } from "@chakra-ui/react";
import { createUseStyles } from "react-jss";

const styles = createUseStyles({
  axisText: {
    fontVariantCaps: "all-small-caps",
    fontWeight: "bold",
    fontSize: "xxx-large",
    fontFamily: "monospace",
  },
  axisBox: {
    minWidth: "100px",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    textAlign: "center",
    margin: ".5rem",
    "@media (max-width: 780px)": {
        display: "none",
      },
  },
});

function YAxisBox() {
  const style = styles();
  return (
    <Box className={style.axisBox}>
      <div className={style.axisText}>
        high
        <br /> energy
      </div>
      <img
        src={process.env.PUBLIC_URL + "/images/double-arrow.png"}
        style={{ transform: "rotate(-90deg)", width: "100px" }}
      />
      <div className={style.axisText}>
        low
        <br /> energy
      </div>
    </Box>
  );
}

export default YAxisBox;
