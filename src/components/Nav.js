import React from 'react'
import {Link} from 'react-router-dom'
import busLogo from '../images/bus_logo.svg'
import languageIcon from '../images/iconoir_language.svg'

const Nav = () => {
    return (
        <section className="header">
            <div className="container">
                <nav class="navbar navbar-expand-lg  d-flex justify-content-between align-items-center">
                    <div>
                        <Link className="navbar-brand" to="/">
                            <img src={ busLogo}  alt="logo pic" width="162px"/>
                        </Link>
                    </div>
                    <ul class="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link text-dark" to="/Search">附近站牌</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#">路線規劃</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#">站點搜尋</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" href="#">我的收藏</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav language-change align-items-center">
                        <a className="navbar-brand" href="#">
                        <img src={languageIcon}  alt="logo pic" height="35px" />
                        </a>
                        <li className='me-3 pe-3 border-dark border-end fw-bold'>中文</li>
                        <li>英文</li> 
                    </ul>
                </nav>
            </div>
        </section>
    );
}

export default Nav
