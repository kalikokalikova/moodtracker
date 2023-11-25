import React, { useContext } from "react";
import { UserContext } from "../Hooks/UserContext";
import GraphPrompt from "../Components/Graph/GraphPrompt";
import Graph from "../Components/Graph/Graph";

function GraphPage() {
  const { user } = useContext(UserContext);

  return (
    <>{user ? <Graph/> : <GraphPrompt/>}</>
  );
}

export default GraphPage;
