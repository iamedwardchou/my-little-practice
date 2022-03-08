import React from 'react'
import banner from '../../images/bg.svg';

const Banner = () => {
    return (
        <div className="banner">
            <img src={banner} style={{width: '100%'}} alt=""className="banner-img" />
            <div className="d-flex banner-block">
                <p className="banner-title">TAIWAN BUS+</p>
                <h3 className="banner-title ">台灣公車動態</h3>
                <h3 className="banner-title mt-5">時刻查詢系統</h3>
            </div>
        </div>
    )
}

export default Banner
