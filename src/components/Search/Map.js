import React, { useState, useEffect, useContext, useRef } from "react";
import { DataContext } from "../../pages/Search";
import { PopupContext } from "../../pages/Search";
import busIcon from "../../images/carbon_bus.svg";
import styled from "styled-components";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  useMap,
  useMapEvents,
} from "react-leaflet";
import marker from "../../images/公車站點 - 到站.svg";
// Import the JS and CSS:
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Base map tile:
const maps = {
  base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};
// 開發想法是渲染目前指定路線上所有站牌的時間資訊 /v2/Bus/StopOfRoute/City/{City}/{RouteName}
// 點選showRoute渲染的站點 以該站點為中心渲染地圖 osm 操作
// 就這樣子吧 難在思考傳遞資料到OSM 套件是否有我想得如此簡單
const Map = () => {
  const { goData, setGoData, backData, setBackData } = useContext(DataContext);
  const { map, setMap, activePopup, arrivedState } = useContext(PopupContext);

  // State vars for our routing machine instance:
  const [routingMachine, setRoutingMachine] = useState(null);

  // 建立兩個圖層, 依照去回路線切換
  // const [currentBus, setCurrentBus] = useState({
  //   time: "",
  //   stopName: "",
  // });

  // Ref for our routing machine instace:

  const RoutingMachineRef = useRef(null);

  useEffect(() => {
    // Check For the map instance:
    if (!map) return;
    if (map && backData.length) {
      const waypoint = [];

      const start = [backData[0].positionLat, backData[0].positionLon];
      const end = [
        backData[backData.length - 1].positionLat,
        backData[backData.length - 1].positionLon,
      ];
      backData.forEach((element) => {
        waypoint.push([element.positionLat, element.positionLon]);
      });

      // Assign Control to React Ref:
      RoutingMachineRef.current = L.Routing.control({
        position: "topleft", // Where to position control on map
        lineOptions: {
          // Options for the routing line
          styles: [
            {
              color: "#757de8",
            },
          ],
        },
        waypoints: waypoint,
        // [start, end],
        waypointMode: "connect",
        createMarker: () => null,
        // 等實作點擊站牌會顯示該站牌時間資訊, marker 也會同時出現
      });
      // Save instance to state:
      setRoutingMachine(RoutingMachineRef.current);
    }
  }, [backData, map]);

  // Once routing machine instance is ready, add to map:
  useEffect(() => {
    if (!routingMachine) return;
    if (routingMachine) {
      routingMachine.addTo(map);
    }
  }, [map, routingMachine]);

  // const position = [51.505, -0.09]
  const position = [24.96052, 121.48321];
  const busMarker = new Icon({
    iconUrl: marker,
    iconSize: [25, 25],
  });

  return (
    <MapContainer
      center={position}
      zoom={12}
      whenCreated={(map) => {
        setMap(map);
      }}
    >
      <TileLayer
        url={maps.base}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker />
      {backData &&
        backData.map((data) => (
          <Marker
            key={data.stopUID}
            position={[data.positionLat, data.positionLon]}
            // onClick={() => {
            //   setActiveData(data);
            // }}
            icon={busMarker}
          >
            {/* <Popup
            position={[data.positionLat, data.positionLon]}
            onClose={() => {
              setActiveData(null);
            }}
          >
            <div>
              <h2>{activeData.stopName}</h2>
              <p>{activeData.time}</p>
            </div>
          </Popup> */}
          </Marker>
        ))}
      {/* 可能需要比照進度條作法，改成 js 檔案以便傳入參數判斷渲染的景顏色
        判斷 className 的作法 比較難實現，因為修改固定樣式比較困難*/}
      {
        activePopup && (
          <MapPopup activePopup={activePopup} arrivedState={arrivedState} />
        )
        // <MapPopup activePopup={activePopup}/>
      }
    </MapContainer>
  );
};

// styles ui 實現三種 popup樣式

const MapPopup = ({ activePopup, arrivedState }) => {

  return (
    <Popup
      className={arrivedState}
      position={[activePopup.positionLat, activePopup.positionLon]}
    >
      <img src={busIcon} className="stop-icon" alt="" />
      <div className="stop-name">{activePopup.stopName}</div>
      <div className="stop-time">{activePopup.time}</div>
    </Popup>
  );
};

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      console.log(map);
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
}
// setCenter to focusing location

export default Map;
