// 推荐列表爬虫到的数据有很多不在restaurantData中的数据，这里补充一下

const fs = require("fs");
const request = require("request");

const data = fs.readFileSync("./recommendList.json", "utf8");
const jsonData = JSON.parse(data);

// 取出所有的restaurantId
const idList = jsonData.map((item) => item.restaurantId);
console.log(idList);
function sendRequest(id, callback) {
  request.post(
    {
      url: "https://m.ctrip.com/restapi/soa2/10332/json/GetRestaurantInfoV705?_fxpcqlniredt=09031129117801633709&x-traceID=09031129117801633709-1682086930396-8050853",
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
        Lon: 121.4232857,
        Lat: 31.1438687,
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
      fs.writeFileSync("./推荐餐厅详情数据.json", JSON.stringify(responseData)); // 当计数器等于idList长度时，所有请求执行完成，将responseData写入文件
      console.log("数据已保存至 推荐餐厅详情数据.json 文件中。");
    }
  });
}
