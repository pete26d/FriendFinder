var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    var bestFriend = {
      name: "",
      photo: "",
      scoreDifferential: 9999
    };

    var userInfo = req.body;
    var userScores = userInfo.scores;

    var totalDiff;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      totalDiff = 0;

      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];
        totalDiff += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      if (totalDiff <= bestFriend.scoreDifferential) {
        bestFriend.name = currentFriend.name;
        bestFriend.photo = currentFriend.photo;
        bestFriend.scoreDifferential = totalDiff;
      }
    }

    friends.push(userInfo);

    res.json(bestFriend);
  });
}