const request = require("request");
const fs = require("fs");
request(
  {
    uri: "https://m.ctrip.com/restapi/soa2/10332/json/GetRestaurantInfoV705?_fxpcqlniredt=09031129117801633709&x-traceID=09031129117801633709-1681635197014-6096992",
    method: "POST",
    headers: {
      accept: "*/*",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "no-cache",
      "content-type": "application/json",
      cookieorigin: "https://m.ctrip.com",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    json: {
      RestaurantId: 7017804,
      PoiId: 0,
      RankingId: "",
      CuisineId: 0,
      SourceFrom: "",
      ImageQuality: 2,
      CurrentDestId: 0,
      Lon: -3.435973,
      Lat: 55.378051,
      Version: "7.04",
      Platform: 1,
      ClientType: "h5",
      DistrictId: "2",
      MoblePhone: "",
      head: {
        cid: "09031129117801633709",
        ctok: "",
        cver: "1.0",
        lang: "01",
        sid: "8888",
        syscode: "09",
        auth: "",
        xsid: "",
        extension: [],
      },
    },
  },
  (error, response, body) => {
    if (error) throw new Error(error);
    // fs.writeFileSync("restaurantData.json", JSON.stringify(body));
    // 把body加到restaurantData的数组里面

    console.log(body); // 打印返回的数据
  }
);
