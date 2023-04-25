const fs = require("fs");
const request = require("request");

// const idList = [25050492, 7516285, 8616260];
const idList = [
  25050492, 7516285, 8616260, 16107114, 11608563, 5023499, 20346800, 121664094, 24568736, 17012597, 5015262, 131510494,
  22578231, 25048637, 304520, 15474095, 5020195, 15457043, 7516333, 16101921, 22652284, 8586264, 78659758, 24690942,
  20632154, 20626523, 22577460, 15517686, 22606366, 133713791, 5007331, 398794, 5002965, 7524346, 16105908, 5026098,
  24567118, 121691902, 134846385, 131113797, 5036963, 5033953, 15139282, 22602620, 84139389, 131127440, 21384769,
  131122977, 5016606, 17615870, 5008610, 22600435, 24939271, 12886245, 78718388, 11680403, 11608516, 16561154,
  134777838, 63001123, 15095554, 21418486, 134167043, 5001364, 130817429, 78905389, 5022687, 7008628, 13064060,
  22577873, 22606481, 22600426, 25012305, 24987257, 129763328, 16108682, 17608219, 16989735, 130019662, 25051431,
  121701819, 22604762, 22606521, 127848133, 25033046, 22605862, 22475246, 78510502, 122698256, 22600717, 22599934,
  25041167, 131114753, 131525544, 121667868, 22605742, 121685528, 18621398, 22577770, 62118801,
];

function sendRequest(id, callback) {
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
        RestaurantId: id,
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
      callback(body); // 回调函数返回body
    }
  );
}

let responseData = []; // 存储请求返回数据的数组

// 定义一个计数器变量，用于计算请求是否全部完成
let counter = 0;
for (let i = 0; i < idList.length; i++) {
  sendRequest(idList[i], (data) => {
    responseData.push(data); // 将返回的数据存入数组
    counter++; 
    if (counter === idList.length) {
      fs.writeFileSync("restaurantData.json", JSON.stringify(responseData)); // 当计数器等于idList长度时，所有请求执行完成，将responseData写入文件
      console.log("数据已保存至 restaurantData.json 文件中。");
    }
  });
}
