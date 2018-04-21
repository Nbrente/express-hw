// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// //GET HTML PATHS
// var getHTMLPath = require('./app/routing/htmlRoutes.js');
// // getHTMLPath.getSurvey
// var x = getHTMLPath.getSurvey();
// var y = getHTMLPath.getAll();
// x;
// y;
// //GET API PATHS
// var getAPIPath = require('./app/routing/apiRoutes.js');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

var friends = [{
    "name": "Ahmed",
    "photo": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
    "scores": [
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
  },
  {
    "name": "brent",
    "photo": "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Batman-BenAffleck.jpg/200px-Batman-BenAffleck.jpg",
    "scores": [
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5,
      5
    ]
  },
  {
    "name": "jacob",
    "photo": "https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Batman-BenAffleck.jpg/200px-Batman-BenAffleck.jpg",
    "scores": [
      1,
      2,
      3,
      1,
      5,
      1,
      3,
      2,
      2,
      1
    ]
  }
];



// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

// Displays all friends as JSON
app.get("/api/friends", function (req, res) {
  res.json(friends);
  console.log('called get /api/friends')
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "app/public/home.html"));
});

// Create New Characters - takes in JSON input
app.post("/api/friends", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newfriend = {
    name: req.body.name,
    photo: req.body.photo,
    scores: [
      parseInt(req.body.q1),
      parseInt(req.body.q2),
      parseInt(req.body.q3),
      parseInt(req.body.q4),
      parseInt(req.body.q5),
      parseInt(req.body.q6),
      parseInt(req.body.q7),
      parseInt(req.body.q8),
      parseInt(req.body.q9),
      parseInt(req.body.q10)
    ]
  };

  var scores = [];
  let unsortedscores = [];
  var indexOfFriend = 0;
  for (let i = 0; i < friends.length; i++) {
    var newScore = 0;
    for (let j = 0; j < friends[i].scores.length; j++) {
      newScore += friends[i].scores[j]
    }
    scores.push(newScore);
    unsortedscores.push(newScore);
  }
  console.log(scores);
  let goal = 0;

  for (let k = 0; k < newfriend.scores.length; k++) {
    goal += newfriend.scores[k];
  };


  let closest = scores.sort((a, b) => Math.abs(goal - a) - Math.abs(goal - b))[0];
  // console.log('closest ' + closest);  
  console.log(scores);
  console.log(unsortedscores)
  // console.log(friends)
  res.send('Your new friend is ' + friends[unsortedscores.indexOf(closest)].name);


  friends.push(newfriend);

});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});