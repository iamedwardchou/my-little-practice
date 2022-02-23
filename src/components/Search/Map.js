import React, { useState, useEffect, useContext, useRef } from "react";
import { DataContext } from "../../pages/Search";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
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
  const [map, setMap] = useState(null);
  const { goData, setGoData, backData, setBackData } = useContext(DataContext);

  // State vars for our routing machine instance:
  const [routingMachine, setRoutingMachine] = useState(null);

  // Start-End points for the routing machine:
  // const [start, setStart] =
  // useState([goData[0].positionLon, goData[0].positionLat])
  // useState([38.9072, -77.0369]);
  // const [end, setEnd] =
  // useState([goData[-1].positionLon, goData[-1].positionLat])
  // useState([37.7749, -122.4194]);

  const [activeData, setActiveData] = useState(null);

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
    if (map) {
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
        waypoints: backData.length
          ? [
            [backData[0].positionLat, backData[0].positionLon],
            [backData[-1].positionLat, backData[-1].positionLon],
          ]
          : [], // Point A - Point B
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
  }, [routingMachine]);

  // const position = [51.505, -0.09]
  const position = [24.96052, 121.48321];
  const busMarker = new Icon({
    iconUrl: marker,
    iconSize: [50, 50],
  });

  return (
    <MapContainer
      center={position}
      zoom={12}
      whenCreated={(map) => setMap(map)}
    >
      <TileLayer
        url={maps.base}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {backData &&
        backData.map((data) => {
          <Marker
            key={data.stopUID}
            position={[data.positionLat, data.positionLon]}
            onClick={() => {
              setActiveData(data);
            }}
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
          </Marker>;
        })}
    </MapContainer>
    // <MapContainer
    //   center={[37.0902, -95.7129]}
    //   zoom={13}
    //   // Set the map instance to state when ready:
    //   whenCreated={(map) => setMap(map)}
    // >
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <Marker position={position} icon={busMarker}>
    //     <Popup>
    //       A pretty CSS3 popup. <br /> Easily customizable.
    //     </Popup>
    //   </Marker>
    // </MapContainer>
  );
};

export default Map;
