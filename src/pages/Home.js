import React from 'react'
import Banner from '../components/HomePage/Banner.js'
import Locations from '../components/HomePage/Locations.js'
import "../styles/components/home.css"

const Home = ({city, setCity}) => {
    return (
        <>
        <Banner />
        <Locations city={city} setCity={setCity}/>
        </>
    )
}

export default Home
