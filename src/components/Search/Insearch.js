import React, {useState, useEffect} from 'react'
import SearchBtn from './SearchBtn'


// async function getBus(){
//     const { data } = await axios.get(API_URL, {
//         headers: getAuthorizationHeader()
//     });
//     return data;
// }

// 接收來自 Search 傳遞的 axios 資料
const Insearch = ({searchTerm, setSearchTerm, setRouteName, setDepName, setDesName, setCurrentRender, busData}) => {
    const [searchResults, setSearchResult] = useState([]);
    const [isRender, setIsRender] = useState(false)
    
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setIsRender(true)
    }
    const SearchRoute = (e) => {
        setRouteName(e.target.dataset.name);
        setDepName(e.target.dataset.dep)
        setDesName(e.target.dataset.des)
        setCurrentRender("ShowRoute");
    }

    useEffect(() => {
        let result = busData.filter(data => {
           return data.RouteName.Zh_tw.includes(searchTerm)
        })

        result.sort((a, b) =>{
            return a.RouteName.Zh_tw - b.RouteName.Zh_tw;
        })
        setSearchResult(result);
    },[searchTerm])

    // history
    return (
        <div className="key-word-search">
             <input
            type="text"
            placeholder="輸入公車路線 / 起訖方向或關鍵字"
            value={searchTerm}
            onChange={handleSearch}
            />  
             <ul>
                {isRender && searchResults.map(item => (
                    <li key={item.RouteUID} onClick={SearchRoute} 
                    data-name={item.RouteName.Zh_tw}
                    data-dep={item.DepartureStopNameZh}
                    data-des={item.DestinationStopNameZh}
                     role="button">{item.RouteName.Zh_tw}
                        <p key={item.RouteUID} data-name={item.RouteName.Zh_tw}>{item.DepartureStopNameZh + `-` +item.DestinationStopNameZh}</p>
                    </li>
                ))}
            </ul>
            <SearchBtn searchTerm={searchTerm} setSearchTerm={setSearchTerm} setIsRender={setIsRender}/>
        </div>
    )
}

export default Insearch

