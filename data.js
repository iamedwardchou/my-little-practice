let data = [
    {
      "id": 0,
      "name": "肥宅心碎賞櫻3日",
      "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
      "area": "高雄",
      "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
      "group": 87,
      "price": 1400,
      "rate": 10
    },
    {
      "id": 1,
      "name": "貓空纜車雙程票",
      "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台北",
      "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
      "group": 99,
      "price": 240,
      "rate": 2
    },
    {
      "id": 2,
      "name": "台中谷關溫泉會1日",
      "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
      "area": "台中",
      "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
      "group": 20,
      "price": 1765,
      "rate": 7
    }
  ];

const tikcetName = document.querySelector("#ticketName")//套票名稱
const ticketImgUrl = document.querySelector("#ticketImgUrl")//圖片網址
const ticketRegion = document.querySelector("#ticketRegion")//景點地區
const ticketPrice = document.querySelector("#ticketPrice")//套票金額
const ticketNum = document.querySelector("#ticketNum")//套票組數
const ticketRate = document.querySelector("#ticketRate")//套票星級
const ticketDescription = document.querySelector("#ticketDescription")//套票描述

// 網頁初始化
const list = document.querySelector(".ticketCard-area")
const searchResultNum = document.querySelector("#searchResult-text")
init()

function init(){
  let str="";
  data.forEach(function(item) {
      str+=`<li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img src="${item.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region">${item.area}</div>
        <div class="ticketCard-rank">${item.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${item.name}</a>
          </h3>
          <p class="ticketCard-description">
            ${item.description}
          </p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${item.price}</span>
          </p>
        </div>
      </div>
    </li>`;
  })
  list.innerHTML = str
  searchResultNum.innerText =`本次搜尋共 ${data.length} 筆資料`
}
//加入新資料到 data 內
function addData(){
  let obj={};
  let defaultObj ={
    "id": data.length-1,
      "name": "命運紅線的陷阱",
      "imgUrl": "https://cache.pttweb.cc/imgur/QjsftgE/f/39d0dba773554bcd2f54ed650e1e0207",
      "area": "???",
      "description": "命運的纏線行星 KLK-X 交叉點，任何人都必去一次的宇宙最大觀光勝地 & 銀河中繼站！",
      "group": 87,
      "price": 666,
      "rate": 3.5
  };
  obj.data=data.length-1
  obj.name=tikcetName.value;
  obj.imgUrl=ticketImgUrl.value;
  obj.area=ticketRegion.value;
  obj.description=ticketDescription.value;
  obj.group=ticketNum.value;
  obj.price=ticketPrice.value;
  obj.rate=ticketRate.value;
  if(obj.name =="" && obj.imgUrl=="" && obj.area=="" && obj.description=="" && obj.group=="" && obj.price=="" && obj.rate==""){
    data.push(defaultObj)
    alert("什麼都沒輸入會加入預設資料喔！")
  }
  else if(obj.name ==""|| obj.area==""|| obj.price==""|| obj.rate==""|| obj.group==""){
    alert("輸入的資料缺失或有誤，請重新輸入！")
    return
  }
  else{
    if(obj.imgUrl== ""){
      obj.imgUrl= "https://iplay.sa.gov.tw/Content/Images/4/pages/pg_text_img_sample.gif"
    }
    if(obj.description == ""){
      obj.description="目前尚未有任何資訊！"
    }
    data.push(obj);
  }
  //清空表單
  tikcetName.value = "";
  ticketImgUrl.value="";
  ticketRegion.value="";
  ticketDescription.value="";
  ticketNum.value="";
  ticketPrice.value="";
  ticketRate.value="";
}

//新增按鈕事件
const addBtn = document.querySelector(".addTicket-btn")

addBtn.addEventListener("click", (e) =>{
  addData()
  init()
})

//地區搜尋功能
const filter = document.querySelector(".regionSearch")

function initSearch(){
  let count = 0
  // 選項變化用 change 監聽
  let str = ""
  filter.addEventListener("change", (e) =>{
    //搜尋全部地區
    if(e.target.value == ""){
      init()
      searchResultNum.innerText =`本次搜尋共 ${data.length} 筆資料`
    }
    else{
      data.forEach(item => {
        if(e.target.value === item.area){
          str+=`<li class="ticketCard">
          <div class="ticketCard-img">
            <a href="#">
              <img src="${item.imgUrl}" alt="">
            </a>
            <div class="ticketCard-region">${item.area}</div>
            <div class="ticketCard-rank">${item.rate}</div>
          </div>
          <div class="ticketCard-content">
            <div>
              <h3>
                <a href="#" class="ticketCard-name">${item.name}</a>
              </h3>
              <p class="ticketCard-description">
                ${item.description}
              </p>
            </div>
            <div class="ticketCard-info">
              <p class="ticketCard-num">
                <span><i class="fas fa-exclamation-circle"></i></span>
                剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
              </p>
              <p class="ticketCard-price">
                TWD <span id="ticketCard-price">$${item.price}</span>
              </p>
            </div>
          </div>
        </li>`
        
        count += 1
        }
      }) 
      list.innerHTML = str;
      searchResultNum.innerText =`本次搜尋共 ${count} 筆資料`
      str=""
      count=0
    }
  })
}

initSearch()