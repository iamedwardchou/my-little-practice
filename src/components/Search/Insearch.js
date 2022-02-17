import React, { useState, useEffect, useContext } from "react";
import SearchBtn from "./SearchBtn";
import styled from "styled-components";

const InsearchUl = styled.ul`
  padding-left: 0;
`;

// 接收來自 Search 傳遞的 axios 資料
const Insearch = (props) => {
  const { busData, setRouteData, searchTerm, setSearchTerm, setCurrentRender } =
    props;
  const [searchResults, setSearchResult] = useState([]);
  const [isRender, setIsRender] = useState(false);
  // 看來是時候用 useContext 來傳遞狀態, 才能在這個檔案設定 localStorage

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setIsRender(true);
    if (e.target.value === "") {
      setIsRender(false);
    }
  };
  const SearchRoute = (e) => {
    setRouteData({
      routeName: e.target.dataset.name,
      depName: e.target.dataset.dep,
      desName: e.target.dataset.des,
    });
    // setRouteName(e.target.dataset.name);
    // setDepName(e.target.dataset.dep)
    // setDesName(e.target.dataset.des)
    setCurrentRender("ShowRoute");
    setSearchTerm("");
  };

  useEffect(() => {
    let result = busData.filter((data) => {
      return data.RouteName.Zh_tw.includes(searchTerm);
    });

    result.sort((a, b) => {
      return a.RouteName.Zh_tw - b.RouteName.Zh_tw;
    });
    setSearchResult(result);
  }, [busData, searchTerm]);

  return (
    <div className="key-word-search">
      <input
        type="text"
        placeholder="輸入公車路線 / 起訖方向或關鍵字"
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* 用vh 設定渲染列表的高度，手機版要小一點 
                還有清除搜尋列表會整個跑出來的問題
                應該就是用setState設定成空就好了

                突然明白要怎麼開發sass 了
                就是以設定概念性樣式, 再依照個別元件建立classname/ styled component微調
                所以才需要 _customerStyle檔案設定網頁基本樣式
            */}
      <InsearchUl className="search-result">
        {isRender &&
          searchResults.map((item) => (
            <li
              key={item.RouteUID}
              onClick={SearchRoute}
              data-name={item.RouteName.Zh_tw}
              data-dep={item.DepartureStopNameZh}
              data-des={item.DestinationStopNameZh}
              role="button"
            >
              {item.RouteName.Zh_tw}
              <p key={item.RouteUID} data-name={item.RouteName.Zh_tw}>
                {item.DepartureStopNameZh + `-` + item.DestinationStopNameZh}
              </p>
            </li>
          ))}
      </InsearchUl>
      <SearchBtn
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setIsRender={setIsRender}
      />
    </div>
  );
};

export default Insearch;
