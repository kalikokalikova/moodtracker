import React, { useContext } from "react";
import { UserContext } from "../Hooks/UserContext";
import GraphPrompt from "../Components/Graph/GraphPrompt";

function GraphPage() {
  const { user } = useContext(UserContext);

  return (
    <>{user ? <div>graph page here</div> : <GraphPrompt/>}</>
  );
}

export default GraphPage;
