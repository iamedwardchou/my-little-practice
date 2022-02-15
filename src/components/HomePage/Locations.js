import React ,{useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import busTaipei from '../../images/bus_icon_taipei.svg'
import busTaoyuan from '../../images/bus_icon_taoyuan.svg'
import busTaichung from '../../images/bus_icon_taichung.svg'
import busTainan from '../../images/bus_icon_tainan.svg'
import busKaohsiung from '../../images/bus_icon_kaohsiung.svg'
import busOtherCity from '../../images/bus_icon_other_city.svg'
import {CityContext} from '../Search/CityContext'


const Locations = () => {
    // let cityList =["台北市 / 新北市", "桃園市", "台中市", "台南市", "高雄市", "其他地區"];
    // let citiesListEng =["Taipei / New Taipei", "Taoyuan", "Taichung", "Tainan", "Kaohsiung", "Other City"];
    /*
    <li className="col location p-4 ">
        <img src={busTaipei} alt="" />
        <p>台北市 / 新北市</p>
        <p>Taipei / New Taipei</p>     
    </li>
    */ 
   /*
    let locationList = document.querySelector('.location-list');
    locationList.addEventListener('click', (e)=>{
        console.log(e.target.value);
    })
   */

    //從app.js 取得 fetch 的city 資料 
    
    const {setCity} = useContext(CityContext)
    // *** 問題在於要如何在useContext 下 setCity

    function handleClick(e){
        e.preventDefault();
        let locationListBtn = e.target.getAttribute('class');
        if(!locationListBtn.includes('cityBtn')){
            return;
        }
        setCity(e.target.dataset.name)
    }
    return (
        <section className="locations">
            <div className="location-bg">
                <ul className="row gx-4 location-list mb-0 me-md-3 py-3" onClick={handleClick}>
                    <li className="col-5 col-md mb-3 mb-md-0 me-3  py-3 location cityBtn" data-name="Taipei" role="button">
                        <Link to="/Search" className="cityBtn d-flex flex-column align-items-center" data-name="Taipei" style={{textDecoration: 'none' }}>
                            <img src={busTaipei} className="cityBtn img-fluid mb-0" data-name="Taipei" alt="" width="50px"/>
                            <br/>
                            <p className="color-taipei location-text fw-bold mb-0 cityBtn" data-name="Taipei">台北市 / 新北市 </p>
                            <p className="color-taipei location-text-sub cityBtn" data-name="Taipei" > Taipei / New Taipei</p> 
                        </Link>
                    </li>
                    <li className="col-5 col-md mb-3 mb-md-0 me-3 py-3 location cityBtn">
                        <a className="cityBtn d-flex flex-column align-items-center" data-name="Taipei" style={{textDecoration: 'none' }}>
                            <img src={busTaoyuan} className="cityBtn img-fluid" data-name="Taipei" alt="" width="50px"/>
                            <br/>
                            <p className="color-taoyuan location-text fw-bold mb-0 cityBtn">桃園市 </p>
                            <p className="color-taoyuan location-text-sub cityBtn">Taoyuan</p> 
                        </a>
                    </li>
                    <li className="col-5 col-md mb-3 mb-md-0 me-3 py-3 location cityBtn">
                         <a className="cityBtn d-flex flex-column align-items-center" data-name="Taipei" style={{textDecoration: 'none' }}>
                            <img src={busTaichung} className="cityBtn img-fluid" data-name="Taipei" alt="" width="50px"/>
                            <br/>
                            <p className="color-taichung location-text fw-bold mb-0 cityBtn">台中市</p>
                            <p className="color-taichung location-text-sub cityBtn">Taichung</p> 
                        </a>
                    </li>
                    <li className="col-5 col-md mb-3 mb-md-0 me-3 py-3 location cityBtn">
                        <a className="cityBtn d-flex flex-column align-items-center" data-name="Taipei" style={{textDecoration: 'none' }}>
                            <img src={busTainan} className="cityBtn img-fluid" data-name="Taipei" alt="" width="50px"/>
                            <br/>
                            <p className="color-tainan location-text fw-bold mb-0 cityBtn">台南市</p>
                            <p className="color-tainan location-text-sub cityBtn">Tainan</p> 
                        </a>
                    </li>
                    <li className="col-5 col-md mb-3 mb-md-0 me-3 py-3 location cityBtn">
                        <a className="cityBtn d-flex flex-column align-items-center" data-name="Taipei" style={{textDecoration: 'none' }}>
                            <img src={busKaohsiung} className="cityBtn img-fluid" data-name="Taipei" alt="" width="50px"/>
                            <br/>
                            <p className="color-kaohsiung location-text fw-bold mb-0 cityBtn">高雄市</p>
                            <p className="color-kaohsiung location-text-sub cityBtn">Kaohsiung</p> 
                        </a>
                    </li>
                    <li className="col-5 col-md mb-3 mb-md-0 py-3 location cityBtn">
                        <a className="cityBtn d-flex flex-column align-items-center" data-name="Taipei" style={{textDecoration: 'none' }}>
                            <img src={busOtherCity} className="cityBtn img-fluid" data-name="Taipei" alt="" width="50px"/>
                            <br/>
                            <p className="color-other-city location-text fw-bold mb-0 cityBtn">其他地區</p>
                            <p className="color-other-city location-text-sub cityBtn">Other City</p> 
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export default Locations
