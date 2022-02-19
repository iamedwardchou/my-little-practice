import React, { useRef } from "react";
import { keyboard_base } from "../../utilities/keyboard_config";
import { Container, Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";


const SearchBtn = ({ searchTerm, setSearchTerm, setIsRender }) => {
  // const btnRef = useRef(null)

  const handleClick = (e) => {
    // console.log(btnRef.current.value)
    let btn = e.target.value;

    if (btn !== "清除" && isNaN(btn) && isNaN(searchTerm)) {
      return;
    }
    // 只差數字後面不能接中文的功能
    // if(!isNaN(btn)){
    //   if(isNaN(searchTerm)){
    //     return
    //   }
    // }
    setSearchTerm(searchTerm + btn);
    setIsRender(true);

    if (btn === "清除") {
      setSearchTerm("");
      setIsRender(false);
    }
  };
  let btnKey = Object.keys(keyboard_base);

  return (
    // <></>
    // <div className="container-fluid keyboard">
    //     <div className="row">
    //         <div className="col-2">
    //             <Button class="search-btn btn-red" value="紅" onClick={handleClick}>紅</Button>
    //             <Button class="search-btn btn-green" value="綠" onClick={handleClick}>綠</Button>
    //             <Button class="search-btn btn-orange" value="橘" onClick={handleClick}>橘</Button>
    //             <Button class="search-btn btn-F"  value="F" onClick={handleClick}>F</Button>
    //         </div>
    //         <div className="col-2">
    //             <Button class="search-btn btn-blue" value="藍" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-brown" value="棕" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-yellow" value="黃" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-small" value="小" onClick={handleClick}></Button>
    //         </div>
    //         <div className="col-2">
    //             <Button class="search-btn btn-num" value="1" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-num" value="4" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-num" value="7" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-other" value="其他" onClick={handleClick}></Button>
    //         </div>
    //         <div className="col-2">
    //             <Button class="search-btn btn-num" value="2" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-num" value="5" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-num" value="8" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-num" value="0" onClick={handleClick}></Button>
    //         </div>
    //         <div className="col-2">
    //             <Button class="search-btn btn-num" value="3" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-num" value="6" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-num" value="9" onClick={handleClick}></Button>
    //             <Button class="search-btn btn-num" value="清除" onClick={clearSearchTerm}></Button>
    //         </div>
    //     </div>
    // </div>
      <Row>
        {btnKey.map((item) => (
          <Col xs={2} className="m-2">
            {keyboard_base[item].map((btn) => (
              <Button
                variant="bus"
                key={btn}
                value={btn}
                onClick={handleClick}
                type="button"
                className="btn-block"
              >
                {btn}
              </Button>
            ))}
          </Col>
        ))}
      </Row>
  );
};

export default SearchBtn;
