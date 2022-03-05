import React, {useState, useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import PcNav from "./components/Navs/PcNav"
import MobileNav from "./components/Navs/MobileNav"
import Home from "./pages/Home.js";
import Search from "./pages/Search.js";
import Copyright from "./components/Copyright.js";
import { CityContext } from "./components/Search/CityContext";
// import "./styles/base/base.css";


function App() {
  const [city, setCity] = useState(()=>{
    const savedCity = localStorage.getItem("city")
    const initialCity = JSON.parse(savedCity)
    return initialCity || ""
  });
  // 目前概念是建立controlcontext 檔案 並用context 控制狀態
  // useReducer 是 useState的替代作法

  useEffect(() =>{
    localStorage.setItem("city", JSON.stringify(city))
  }, [city])

  return (
    <>
      <PcNav />
      <MobileNav/>
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
