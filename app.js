const fs = require("fs"); // module enables interacting with the file system
const path = require("path"); // module provides utilities for working with file and directory paths

const express = require("express"); // Creates an Express application
const app = express();

app.set("views", path.join(__dirname, "views")); // Join all arguments together and normalize the resulting path
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
  //fs used because this project doesn't have a real database
  const filePath = path.join(__dirname, "data", "restaurants.json"); // configure the location of the json
  const fileData = fs.readFileSync(filePath); // read the json file
  const storedRestaurants = JSON.parse(fileData); // parse data into json
  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
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
