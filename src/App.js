import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Nav from './components/Nav.js'
import Home from './pages/Home.js'
import Search from './pages/Search.js'
import Copyright from './components/Copyright.js'
// import "./styles/base/base.css";


function App() {
  const [city, setCity] = useState("")
  return (
  <>
    <Nav/>
    <Routes>
      <Route path="/" exact element={<Home city={city} setCity={setCity}/>} />
      <Route path="/search" exact element={<Search city={city}/>}/>
    </Routes>
    <Copyright />
  </>
  );
}

export default App;
