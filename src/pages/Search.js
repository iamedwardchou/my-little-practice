import React,{useState, useEffect} from 'react'
import Insearch from '../components/Search/Insearch.js'
import ShowRoute from '../components/Search/ShowRoute.js'
import Map from '../components/Search/Map.js'
import { apiBusCity } from '../Api.js'

const Search = ({city}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [busData, setBusData] = useState([])
    const [routeName, setRouteName] = useState("");
    const [depName, setDepName] = useState("")
    const [desName, setDesName] = useState("")
    const [currentRender, setCurrentRender] = useState("Insearch")

    // useEffect(() => {
    //     axios.get(API_URL, {
    //         headers: getAuthorizationHeader()
    //     }).then((response =>{
    //         setBusData(response.data)
    //     }))
    // }, [])

    useEffect(() => {
        getData()
    }, [])

    async function getData(){
        try{
            let res = await apiBusCity(city)
            if(res.status === 200){
                console.log(res.status)
            }    
            setBusData(res.data)
        }
        catch(err){
            console.error(err)
        }    
    }
  

    return (
        <div className="container-fluid">
            <span>
                首頁 / 
            </span>
            <div className="row">
                <div className="col-4">
                    {currentRender === "Insearch" && (
                        <Insearch 
                        searchTerm={searchTerm} 
                        setSearchTerm={setSearchTerm}
                        busData={busData}
                        setRouteName={setRouteName}
                        setDepName={setDepName}
                        setDesName={setDesName}
                        setCurrentRender={setCurrentRender}
                        />
                    )}
                    {currentRender === "ShowRoute" && 
                        <ShowRoute
                        city={city}
                        routeName={routeName}
                        depName={depName}
                        desName={desName}
                        setCurrentRender={setCurrentRender}
                        />
                    }
                </div>
                <div className="col-8">
                    <Map/>
                </div>
            </div>
        </div>
    )
}

export default Search
