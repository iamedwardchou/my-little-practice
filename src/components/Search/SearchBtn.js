import React from 'react';
import {keyboard_base} from '../../utilities/keyboard_config';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../styles/components/serachBtn.css'

const SearchBtn = (props, {searchTerm, setSearchTerm, setIsRender}) => {
    const handleClick = (e) => {
        setSearchTerm(e.target.value)
        setIsRender(true)
    }
    const clearSearchTerm = () => {
        setSearchTerm("")
        setIsRender(false)
    }

    return (
        // <></>
        <div className="container-fluid keyboard">
            <div className="row">
                <div className="col-2">
                    <Button class="search-btn btn-red" value="紅" onClick={handleClick}>紅</Button>
                    <Button class="search-btn btn-green" value="綠" onClick={handleClick}>綠</Button>
                    <Button class="search-btn btn-orange" value="橘" onClick={handleClick}>橘</Button>
                    <Button class="search-btn btn-F"  value="F" onClick={handleClick}>F</Button>
                </div>
                <div className="col-2">
                    <Button class="search-btn btn-blue" value="藍" onClick={handleClick}></Button>
                    <Button class="search-btn btn-brown" value="棕" onClick={handleClick}></Button>
                    <Button class="search-btn btn-yellow" value="黃" onClick={handleClick}></Button>
                    <Button class="search-btn btn-small" value="小" onClick={handleClick}></Button>
                </div>
                <div className="col-2">
                    <Button class="search-btn btn-num" value="1" onClick={handleClick}></Button>
                    <Button class="search-btn btn-num" value="4" onClick={handleClick}></Button>
                    <Button class="search-btn btn-num" value="7" onClick={handleClick}></Button>
                    <Button class="search-btn btn-other" value="其他" onClick={handleClick}></Button>
                </div>
                <div className="col-2">   
                    <Button class="search-btn btn-num" value="2" onClick={handleClick}></Button>
                    <Button class="search-btn btn-num" value="5" onClick={handleClick}></Button>
                    <Button class="search-btn btn-num" value="8" onClick={handleClick}></Button>
                    <Button class="search-btn btn-num" value="0" onClick={handleClick}></Button>
                </div>
                <div className="col-2">
                    <Button class="search-btn btn-num" value="3" onClick={handleClick}></Button>
                    <Button class="search-btn btn-num" value="6" onClick={handleClick}></Button>
                    <Button class="search-btn btn-num" value="9" onClick={handleClick}></Button>
                    <Button class="search-btn btn-num" value="清除" onClick={clearSearchTerm}></Button>
                </div>
            </div>
        </div>
        // <Container>
        //     <Row>
        //     {keyboard_base.map((item) => 
        //     <Button key={item} type="button" className="">{item}</Button>
        //     )}
        //     </Row>
        // </Container>
    )
}

export default SearchBtn
