import React, { useState, useEffect, useRef, useCallback } from "react";
import { apiBusRoute, apiBusStopRoute } from "../../Api";

const ShowRoute = ({ city, routeName, depName, desName, setCurrentRender }) => {
  // const [busRoute,setBusRoute] = useState([])
  // const [stopRouteData,setStopRouteData] = useState([])
  // const [arrivalTime,setArrivalTime] = useState([])
  const [reFetch, setReFetch] = useState(false);
  const [status, setStatus] = useState("back");

  const [goData, setGoData] = useState(() =>{
    const savedGo = localStorage.getItem("goData")
    const intialGo = JSON.parse(savedGo)
    return intialGo || [];
  });
  const [backData, setBackData] = useState(()=>{
    const savedBack = localStorage.getItem("backData")
    const intialBack = JSON.parse(savedBack)
    return intialBack || []
  });

  const handleRefetch = () => {
    fetchData();
    setReFetch(true);
  };

  function getGoStop(stopRouteData) {
    // 選取站數最多的為路線列表
    const GoStops = stopRouteData.filter(
      (item) => item.Direction && item.RouteName.Zh_tw === routeName
    );
    let maxStopsNum = 0;
    let stopIndex = 0;
    GoStops.forEach((item, index) => {
      if (item.Stops.length > maxStopsNum) {
        maxStopsNum = item.Stops.length;
        stopIndex = index;
      }
    });
    let stops = GoStops[stopIndex].Stops;
    // console.log(stops)
    return stops;
  }
  function getGoRoute(busRoute) {
    const catchData = busRoute.filter(
      (item) => item.Direction && item.RouteName.Zh_tw === routeName
    );

    let busGoData = [];

    catchData.forEach((item) => {
      busGoData.push({
        estimateTime: item.EstimateTime, //到站時間預估(秒)
        stopUID: item.StopUID, //站牌唯一識別代碼
      });
    });
    return busGoData;
  }
  function getBackStop(stopRouteData) {
    // 選取站數最多的為路線列表
    const backStops = stopRouteData.filter(
      (item) => !item.Direction && item.RouteName.Zh_tw === routeName
    );
    let maxStopsNum = 0;
    let stopIndex = 0;
    backStops.forEach((item, index) => {
      if (item.Stops.length > maxStopsNum) {
        maxStopsNum = item.Stops.length;
        stopIndex = index;
      }
    });
    // console.log(backStops)

    let stops = backStops[stopIndex].Stops;
    // console.log(stops)
    return stops;
  }
  function getBackRoute(busRoute) {
    const cachebackData = busRoute.filter(
      (item) => !item.Direction && item.RouteName.Zh_tw === routeName
    );

    let busBackData = [];

    cachebackData.forEach((item) => {
      busBackData.push({
        estimateTime: item.EstimateTime, //到站時間預估(秒)
        stopUID: item.StopUID, //站牌唯一識別代碼
      });
    });
    return busBackData;
  }

  const fetchData = useCallback(() => {
    let goRouteData = [];
    let backRouteData = [];
    let stopData = [];
    console.log(status);
    //看來只能先處理完第一次呼叫，再處理下一次呼叫
    async function getBus() {
      try {
        let res = await apiBusRoute(city, routeName);
        if (res.status === 200) {
          console.log(res.status);
        }
        if (status === "go") {
          console.log("go");
          goRouteData = getGoRoute(res.data);
          getRoute(goRouteData, status);
        } else if (status === "back") {
          console.log("back");
          backRouteData = getBackRoute(res.data);
          getRoute(backRouteData, status);
        }
      } catch (err) {
        console.error(err);
      }
    }

    async function getRoute(routeData, status) {
      try {
        let res = await apiBusStopRoute(city, routeName);
        if (res === 200) {
          console.log(res.status);
        }
        if (status === "go") {
          console.log("goStops");
          stopData = getGoStop(res.data);
        } else if (status === "back") {
          console.log("backStops");
          stopData = getBackStop(res.data);
        }
        let time = 0;
        let timeText = "";
        let dataTest = [];

        stopData.forEach((stop) => {
          routeData.forEach((route) => {
            let dataObj = {};
            if (route.stopUID === stop.StopUID) {
              time = Math.floor(route.estimateTime / 60);
              // 文字顯示
              if (time === 0) {
                timeText = "進站中";
              } else if (time <= 1 && 0 < time) {
                timeText = "即將到站";
              } else if (!time) {
                timeText = "--";
              } else {
                timeText = `${time} 分鐘`;
              }
              dataObj.stopUID = stop.StopUID;
              dataObj.time = timeText;
              dataObj.stopName = stop.StopName.Zh_tw;
              dataTest.push(dataObj);
              // console.log(dataTest)
            }
          });
        });
        // 再來設定各種set 再帶到去返程組件渲染
        if (status === "back") {
          setBackData(dataTest);
        } else if (status === "go") setGoData(dataTest);
      } catch (err) {
        console.error(err);
      }
    }
    getBus();
    setReFetch(false);
  }, [status]);

  useEffect(() => {
    console.log("execute function in useEffect");
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    localStorage.setItem("goData", JSON.stringify(goData))
  }, [goData]);

  useEffect(() => {
    localStorage.setItem("backData", JSON.stringify(backData))
  }, [backData]);
  // 先在dependencies 這裡確定要儲存的goData 和 bakcData, 要先JSON.stringfy
  // 再到一開始 useState的地方取得 parse後的 data

  // 在這裡處理非同步回傳的資料
  // useEffect(() => {
  //     console.log(busRoute)
  //     console.log(stopRouteData)
  //     // getBackRoute()
  // },[busRoute,stopRouteData])

  // 再配合即時路線資訊渲染到站時間
  // console.log(maxStopsNum, stopIndex)
  // let stop = Math.max.apply(Math, stopRouteBack.map((route) => route.Stops.length))

  return (
    <div>
      <button
        type="button"
        class="btn btn-outline-primary"
        value="返回搜尋"
        onClick={() => {
          setCurrentRender("Insearch");
        }}
      >
        返回搜尋
      </button>
      <h1>{routeName}</h1>
      <SearchNav
        depName={depName}
        desName={desName}
        setStatus={setStatus}
        fetchData={fetchData}
      />
      <ul>
        {status === "back" &&
          backData &&
          backData.map((data) => <li key={data.stopUID}>{data.stopName}</li>)}
        {status === "go" &&
          goData &&
          goData.map((data) => <li key={data.stopUID}>{data.stopName}</li>)}
      </ul>

      <button
        type="button"
        class="btn btn-outline-primary"
        value="立即更新"
        onClick={handleRefetch}
      >
        立即更新
      </button>
    </div>
  );
};

const SearchNav = ({ depName, desName, setStatus, fetchData }) => {
  //不用useRef 好像也沒關係
  const statusValue = useRef(null);
  const handleSelectRoute = (e) => {
    setStatus(e.target.value);
    console.log(statusValue.current);
    fetchData();
  };
  return (
    <>
      <button
        type="button"
        class="btn btn-outline-primary"
        value="back"
        ref={statusValue}
        onClick={handleSelectRoute}
      >
        往{desName}
      </button>
      <button
        type="button"
        class="btn btn-outline-primary"
        value="go"
        ref={statusValue}
        onClick={handleSelectRoute}
      >
        往{depName}
      </button>
    </>
  );
};

export default ShowRoute;