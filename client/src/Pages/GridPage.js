import React from "react";
import Grid from "../Components/Grid/Grid";
import { Text } from "@chakra-ui/react";
import YAxisBox from "../Components/Axes/YAxisBox";

function GridPage() {
  return (
    <>
      <Text fontSize="4xl" style={{ margin: "2rem", textAlign: "center" }}>
        Click a square to save your current mood.
      </Text>
      <div style={{ display: "flex" }}>
        <YAxisBox/>
        <Grid />
      </div>
    </>
  );
}

export default GridPage;
