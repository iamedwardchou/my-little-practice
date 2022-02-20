import axios from 'axios';
import jsSHA from 'jssha'

const busRequest = axios.create({
    baseURL: `https://ptx.transportdata.tw/MOTC/v2/Bus/`
  });


export const apiBusCity = (city) => busRequest.get(`Route/City/${city}?%24top=10&&%24format=JSON`, 
    {
        headers: getAuthorizationHeader()
    });

export const apiBusRoute = (city, routeName) => busRequest.get(`EstimatedTimeOfArrival/City/${city}/${routeName}`, 
    {
        headers: getAuthorizationHeader()
    });

export const apiBusRouteStop = (city, routeName) => busRequest.get(`StopOfRoute/City/${city}/${routeName}`,
    {
        headers: getAuthorizationHeader()
    });

function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
        let AppID = 'f6246cea392d4bbcba886c7b279b9c1f';
        let AppKey = 'o6gP3j8k33PEcd90sgaP5SjrxlM';
    //  填入自己 ID、KEY 結束
        let GMTString = new Date().toGMTString();
        let ShaObj = new jsSHA('SHA-1', 'TEXT');
        ShaObj.setHMACKey(AppKey, 'TEXT');
        ShaObj.update('x-date: ' + GMTString);
        let HMAC = ShaObj.getHMAC('B64');
        let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
        return { 'Authorization': Authorization, 'X-Date': GMTString }; 
    }