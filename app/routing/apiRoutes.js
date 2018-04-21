// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

module.exports = {
  //display all friends as JSON
  getAPI: function () {
    app.get("/api/friends", function (req, res) {
      return res.json(friends);
    });
  },
  postAPI: function () {
    // Create New Characters - takes in JSON input
    app.post("/api/friends", function (req, res) {
      // req.body hosts is equal to the JSON post sent from the user
      // This works because of our body-parser middleware
      var newfriend = req.body;

      // Using a RegEx Pattern to remove spaces from newCharacter
      // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
      newfriend.routeName = newfriend.name.replace(/\s+/g, "").toLowerCase();

      console.log(newfriend);

      friends.push(newfriend);

      res.json(newfriend);
    });
  }
};

