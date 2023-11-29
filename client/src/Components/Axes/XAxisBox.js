import React from "react";
import { Box } from "@chakra-ui/react";
import { createUseStyles } from "react-jss";

// TODO refactor this out to avoid duplication in Y axis
const styles = createUseStyles({
  axisText: {
    fontVariantCaps: "all-small-caps",
    fontWeight: "bold",
    fontSize: "xxx-large",
    fontFamily: "monospace",
  },
});

function XAxisBox() {
  const style = styles();
  return (
    <Box
      minW={"100%"}
      minH={"100px"}
      style={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-evenly",
        margin: '.5rem',
      }}
    >
      <div className={style.axisText}>unpleasant</div>
      <img
        src={process.env.PUBLIC_URL + "/images/double-arrow.png"}
        style={{ width: "100px" }}
      />
      <div className={style.axisText}>pleasant</div>
    </Box>
  );
}

export default XAxisBox;
