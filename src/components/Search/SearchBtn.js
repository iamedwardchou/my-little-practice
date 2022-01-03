import React from 'react';
import '../../styles/components/serachBtn.css'

const SearchBtn = ({searchTerm, setSearchTerm, setIsRender}) => {
    const handleClick = (e) => {
        setSearchTerm(e.target.value)
        setIsRender(true)
    }
    const clearSearchTerm = () => {
        setSearchTerm("")
        setIsRender(false)
    }

    return (
        <div className="container-fluid keyboard">
            <div className="row">
                <div className="col-2">
                    <input type="button" class="search-btn btn-red" value="紅" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-green" value="綠" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-orange" value="橘" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-F"  value="F" onClick={handleClick}/>
                </div>
                <div className="col-2">
                    <input type="button" class="search-btn btn-blue" value="藍" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-brown" value="棕" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-yellow" value="黃" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-small" value="小" onClick={handleClick}/>
                </div>
                <div className="col-2">
                    <input type="button" class="search-btn btn-num" value="1" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-num" value="4" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-num" value="7" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-other" value="其他" onClick={handleClick}/>
                </div>
                <div className="col-2">   
                    <input type="button" class="search-btn btn-num" value="2" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-num" value="5" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-num" value="8" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-num" value="0" onClick={handleClick}/>
                </div>
                <div className="col-2">
                    <input type="button" class="search-btn btn-num" value="3" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-num" value="6" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-num" value="9" onClick={handleClick}/>
                    <input type="button" class="search-btn btn-num" value="清除" onClick={clearSearchTerm}/>
                </div>
            </div>
        </div>
    )
}

export default SearchBtn
