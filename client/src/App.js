import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GridPage from "./Pages/GridPage";
import GraphPage from "./Pages/GraphPage";
import Navbar from "./Components/Navbar";
import RegisterOrLoginPage from "./Pages/AuthPage";
import { UserContext } from "./Hooks/UserContext";

const App = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<GridPage />} />
              <Route path="/my-graph" element={<GraphPage />} />
              <Route
                path="/register-or-login"
                element={<RegisterOrLoginPage />}
              />
            </Routes>
          </div>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
