const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

app.use(express.static("public")); // accessing STATIC files
app.use(express.urlencoded({ extended: false })); //parsing data

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
}); // index.html

app.get("/confirm", function (request, response) {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  response.sendFile(htmlFilePath);
});

app.get("/restaurants", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  res.sendFile(htmlFilePath);
});

app.get("/about", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFilePath);
});

app.get("/recommend", function (req, res) {
  const htmlPathFile = path.join(__dirname, "views", "recommend.html");
  res.sendFile(htmlPathFile);
});

//POST
app.post("/recommend", function (req, res) {
  const restaurant = req.body;
  const filePath = path.join(__dirname, "data", "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const storedRestaurants = JSON.parse(fileData);
  storedRestaurants.push(restaurant);
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  res.redirect("/confirm");
});

app.listen(3000);
