import React, { useState, useEffect, useContext } from "react";
import Insearch from "../components/Search/Insearch.js";
import ShowRoute from "../components/Search/ShowRoute.js";
import Map from "../components/Search/Map.js";
import { CityContext } from "../components/Search/CityContext";
import { BusDataContext } from "../components/Search/BusDataContext";
import { apiBusCity } from "../Api.js";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [busData, setBusData] = useState([]);
  const [routeData, setRouteData] = useState({
      routeName: "",
      depName: "",
      desName: "",
  })
//   const [routeName, setRouteName] = useState("");
//   const [depName, setDepName] = useState("");
//   const [desName, setDesName] = useState("");
  const [currentRender, setCurrentRender] = useState("Insearch");

  const { city } = useContext(CityContext);
  // 設置busDataProvider 可以順便把目的地等資料放進去傳遞

  // useEffect(() => {
  //     axios.get(API_URL, {
  //         headers: getAuthorizationHeader()
  //     }).then((response =>{
  //         setBusData(response.data)
  //     }))
  // }, [])

  useEffect(() => {
    getData();
  }, []);

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

  return (
      <div className="container-fluid">
        <span>首頁 /</span>
        <div className="row">
          <div className="col-md-4">
            {currentRender === "Insearch" && (
              <Insearch
                busData={busData}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setRouteData={setRouteData}
                // setRouteName={setRouteName}
                // setDepName={setDepName}
                // setDesName={setDesName}
                setCurrentRender={setCurrentRender}
              />
            )}
            {currentRender === "ShowRoute" && (
              <ShowRoute
                city={city}
                routeData={routeData}
                // routeName={routeName}
                // depName={depName}
                // desName={desName}
                setCurrentRender={setCurrentRender}
              />
            )}
          </div>
          <div className="col-md-8 ">
            <Map />
          </div>
        </div>
      </div>
  );
};

export default Search;
