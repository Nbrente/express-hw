// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var router = express.Router()
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "../public/survey.html"));
}) 

router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});




module.exports = {
    getSurvey: function() {
      console.log('hello');
      app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
      });
    },
    getAll: function () {
      app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "app/public/home.html"));
      });
    }
};