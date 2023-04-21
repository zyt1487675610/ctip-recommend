const fs = require("fs");

// 读取 JSON 文件
const data = fs.readFileSync("./data/recommendFake.json", "utf8");

const jsonData = JSON.parse(data);

// 组成新数组
const recommendList = [];
jsonData.forEach((item) => {
  item.aroundRecommendInfos.forEach((info) => {
    if (info.recommendType === 1) {
      recommendList.push(info);
    }
  });
});
fs.writeFileSync("./data/recommendList.json", JSON.stringify(recommendList));
console.log("成功创建 recommendList.json 文件");
