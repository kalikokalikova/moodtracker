import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GridPage from "./Pages/GridPage";
import GraphPage from "./Pages/GraphPage";
import Navbar from "./Components/Navbar";
import RegisterOrLoginPage from "./Pages/RegisterOrLoginPage";

const App = () => (
  <Router>
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<GridPage />} />
          <Route path="/my-graph" element={<GraphPage />} />
          <Route path="/register-or-login" element={<RegisterOrLoginPage />} />
        </Routes>
      </div>
    </div>
  </Router>
);

export default App;
