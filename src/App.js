import React, {useState } from "react";
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
      {/* 之前是將city 傳到location 設定setCity 然後Search 元件才有city可用
      這下頭大了 */}
      {/* 原來只要在這裡傳入上面的setCity就好了 */}
      <CityContext.Provider value={{city, setCity}}>
        <Routes>
          <Route
            path="/"
            exact
            element={<Home/>}
          />
          <Route path="/search" exact element={<Search/>} />
        </Routes>
      </CityContext.Provider>
      <Copyright />
    </>
  );
}

export default App;
