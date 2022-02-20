import React, { useState, useEffect, useCallback, useContext } from "react";
import Insearch from "../components/Search/Insearch.js";
import ShowRoute from "../components/Search/ShowRoute.js";
import Map from "../components/Search/Map.js";
import { CityContext } from "../components/Search/CityContext";
import { apiBusCity } from "../Api.js";

const DataContext = React.createContext(null)

const Search = () => {
  const { city } = useContext(CityContext);
  // 設置busDataProvider 可以順便把目的地等資料放進去傳遞

  const [searchTerm, setSearchTerm] = useState("");
  const [goData, setGoData] = useState([]);
  const [backData, setBackData] = useState([]);

  const [busData, setBusData] = useState(() => {
    const saveBusData = localStorage.getItem("busData");
    const initBusData = JSON.parse(saveBusData);
    return initBusData || [];
  });

  // localStorage存 Object 要再查看看對不對
  const [routeData, setRouteData] = useState(() => {
    const saveRouteData = localStorage.getItem("routeData");
    const initRouteData = JSON.parse(saveRouteData);
    // 出發和目的地會取得不到 大概是setState 的緣故
    return (
      initRouteData || {
        routeName: "",
        depName: "",
        desName: "",
      }
    );
  });
  const [currentRender, setCurrentRender] = useState("Insearch");

  useEffect(() => {
    localStorage.setItem("busData", JSON.stringify(busData));
  }, [busData]);

  useEffect(() => {
    localStorage.setItem("routeData", JSON.stringify(routeData));
  }, [routeData]);

  const fetchData = useCallback(() => {
    async function getData() {
      try {
        let res = await apiBusCity(city);
        if (res.status === 200) {
          console.log(res.status);
        }
        setBusData(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, [city]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DataContext.Provider value={{goData, setGoData, backData, setBackData}}>
      <div className="container-fluid">
        <span>首頁 /</span>
        <div className="row">
          <div className="col-md-3">
            {currentRender === "Insearch" && (
              <Insearch
                busData={busData}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setRouteData={setRouteData}
                setCurrentRender={setCurrentRender}
              />
            )}
            {currentRender === "ShowRoute" && (
              <ShowRoute
                city={city}
                routeData={routeData}
                setCurrentRender={setCurrentRender}
              />
            )}
          </div>
          <div className="col-md-9 ">
            <Map />
          </div>
        </div>
      </div>
    </DataContext.Provider>
  );
};

export {DataContext}
export default Search;

