const express = require("express");
const app = express();
const port = 3000;
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var axios = require("axios").default;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Arthur:102030_art@personal-website.ia7dg.mongodb.net/musicSearches?retryWrites=true&w=majority";

app.get("/", (req, res) =>
  res.sendFile(
    "C:/Users/Noakes 2/Documents/NodeMusic-Arthur/public/index.html"
  )
);

function printValues(object) {
  for (var k in object) {
    if (obj[k] instanceof Object) {
      printValues(object[k]);
    } else {
      document.write(object[k] + "<br>");
    }
  }
}

app.post("/search", urlencodedParser,(req, res) => {
  var search =  req.body.name;
  console.log(req.body.name);
  var options = {
    method: "GET",
    url: "https://api.music.apple.com/v1/me/library/search",
    params: { term: search, types: "library-songs", offset: "0", limit: "300" },
  };

  axios
    .request(options)
    .then(function (response) {
      var reply = response.data;
      var obj = JSON.parse(reply);
      printValues(obj);
      alert(obj["result"]["library-songs"]["data"]["attributes"]["name"]);
      var songName = obj["result"]["library-songs"]["data"]["attributes"]["name"]
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("musicSearches");
        var myobj = { name: search, address: songName };
        dbo.collection("music").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    })
    .catch(function (error) {
      console.error(error);
    });
  
  
});

app.listen(port, () => console.log(`Server is runing on port ${port}!`));
