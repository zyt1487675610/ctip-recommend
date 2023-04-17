const express = require("express");
const fs = require("fs");

const app = express();
const port = 8888;

app.get("/api/restaurant/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("restaurantData.json", "utf-8", (err, data) => {
    if (err) throw err;
    const responseData = JSON.parse(data);
    const restaurantInfo = responseData.find((item) => item.RestaurantInfo.RestaurantId === +id);
    res.json(restaurantInfo);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
