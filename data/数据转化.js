const list_ecust = [
  
];

console.log(list_ecust.length);
// 过滤RestaurantId相同的数据
const list2 = list_ecust.filter((item, index, arr) => {
  return arr.findIndex((item2) => item2.RestaurantId === item.RestaurantId) === index;
});
console.log(list2.length);

// 把所有的RestaurantId放到一个数组里
const idList = list2.map((item) => item.RestaurantId);
console.log(idList);
// 保存到本地
const fs = require("fs");
fs.writeFileSync("./idList.json", JSON.stringify(idList));

// 把list_ecust保存为json文件
fs.writeFileSync("./restaurant_list_ecust.json", JSON.stringify(list_ecust));
