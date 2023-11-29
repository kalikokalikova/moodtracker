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
});

function YAxisBox() {
  const style = styles();
  return (
    <Box
      minW={"100px"}
      minH={"100%"}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        textAlign: "center",
      }}
    >
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
