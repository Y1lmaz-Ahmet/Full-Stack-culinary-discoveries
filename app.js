const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //EJS template engine

app.use(express.static("public")); // accessing STATIC files
app.use(express.urlencoded({ extended: false })); //parsing data

app.get("/", function (req, res) {
  res.render("index");
}); // index.html

app.get("/confirm", function (request, res) {
  res.render("confirm");
});

app.get("/restaurants", function (req, res) {
  res.render("restaurants");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

//POST
app.post("/recommend", function (req, res) {
  const restaurant = req.body; //reqest the body
  const filePath = path.join(__dirname, "data", "restaurants.json"); // configure the location of the json
  const fileData = fs.readFileSync(filePath); // read the json file
  const storedRestaurants = JSON.parse(fileData); // parse data into json
  storedRestaurants.push(restaurant); // push the json in the json file
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants)); // update the json file with the newest json data
  res.redirect("/confirm");
});

app.listen(3000);
