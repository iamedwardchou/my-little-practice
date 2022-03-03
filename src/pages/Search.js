import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import Insearch from "../components/Search/Insearch.js";
import ShowRoute from "../components/Search/ShowRoute.js";
import Map from "../components/Search/Map.js";
import { CityContext } from "../components/Search/CityContext";
import { apiBusCity } from "../Api.js";

const DataContext = React.createContext(null);
const PopupContext = React.createContext(null);

const Search = () => {
  const { city } = useContext(CityContext);
  // 設置busDataProvider 可以順便把目的地等資料放進去傳遞

  const routes = [
    {
      path: "/search",
      breadcrumb: " / " + city,
    },
  ];
  const breadcrumbs = useBreadcrumbs(routes);

  const [searchTerm, setSearchTerm] = useState("");
  const [goData, setGoData] = useState([]);
  const [backData, setBackData] = useState([]);
  // 點選站牌列表觸發到站資訊
  const [activePopup, setActivePopup] = useState(null);

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
    <DataContext.Provider value={{ goData, setGoData, backData, setBackData }}>
      <PopupContext.Provider value={{ activePopup, setActivePopup }}>
        <div className="breadcrumb">
          {breadcrumbs.map(({ match, breadcrumb }) => (
            <span key={match.pathname}>
              <Link to={match.pathname} style={{ textDecoration: "none" }}>
                {breadcrumb}
              </Link>
            </span>
          ))}
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="search-block col-md-3">
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
              <Map/>
            </div>
          </div>
        </div>
      </PopupContext.Provider>
    </DataContext.Provider>
  );
};

export { DataContext };
export { PopupContext };
export default Search;
