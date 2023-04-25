const fs = require("fs");

// 读取 JSON 文件
const data = fs.readFileSync("./recommendFake.json", "utf8");

const jsonData = JSON.parse(data);

// 组成新数组
const recommendList = [];
jsonData.forEach((item) => {
  item.aroundRecommendInfos.forEach((info) => {
    if (info.recommendType === 2) {
      recommendList.push(info);
    }
  });
});
fs.writeFileSync("./recommendList.json", JSON.stringify(recommendList));
console.log("成功创建 recommendList.json 文件");
