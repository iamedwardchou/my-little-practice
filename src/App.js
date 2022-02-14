import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.js";
import Home from "./pages/Home.js";
import Search from "./pages/Search.js";
import Copyright from "./components/Copyright.js";
import { CityContext } from "./components/Search/CityContext";
// import "./styles/base/base.css";

function App() {
  const [city, setCity] = useState("");
  // 目前概念是建立controlcontext 檔案 並用context 控制狀態
  // useReducer 是 useState的替代作法
  return (
    <>
      <Nav />
      <CityContext.Provider value={{ cityContext: city }}>
        <Routes>
          <Route
            path="/"
            exact
            element={<Home/>}
          />
          <Route path="/search" exact element={<Search city={city} />} />
        </Routes>
      </CityContext.Provider>
      <Copyright />
    </>
  );
}

export default App;
