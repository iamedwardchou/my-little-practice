import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../pages/Search";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// 開發想法是渲染目前指定路線上所有站牌的時間資訊 /v2/Bus/StopOfRoute/City/{City}/{RouteName}
// 點選showRoute渲染的站點 以該站點為中心渲染地圖 osm 操作
// 就這樣子吧 難在思考傳遞資料到OSM 套件是否有我想得如此簡單
const Map = () => {
  const { goData, backData } = useContext(DataContext);
  const [activeData, setActiveData] = useState(null);

  // 建立兩個圖層, 依照去回路線切換
  const [currentBus, setCurrentBus] = useState({
    time: "",
    stopName: "",
  });

  useEffect(() => {}, []);

  const position = [24.96052, 121.48321]

  return (
    <MapContainer center={position} zoom={12}>
      <TileLayer
       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {goData.map((data) => {
        <Marker
          key={data.stopUID}
          position={[data.positionLat, data.positionLon]}
          onClick={() => {
            setActiveData(data);
          }}
          icon={Icon}
        >
          <Popup
            position={[data.positionLat, data.positionLon]}
            onClose={() => {
              setActiveData(null);
            }}
          >
            <div>
              <h2>{activeData.stopName}</h2>
              <p>{activeData.time}</p>
            </div>
          </Popup>
        </Marker>;
      })}
    </MapContainer>
  );
};

export default Map;
