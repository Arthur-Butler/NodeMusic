const express = require('express')
const app = express()
const port = 3000
var axios = require("axios").default;

app.get('/', (req, res) => res.sendFile('C:/Users/Noakes 2/Documents/node music/index.html'))

function printValues(object) {
    for(var k in object) {
        if(obj[k] instanceof Object) {
            printValues(object[k]);
        } else {
            document.write(object[k] + "<br>");
        };
    }
};

app.post("/search", (req, res) => {
    var search = req.body.searchResult;
    
    var options = {
        method: 'GET',
        url: 'https://api.music.apple.com/v1/me/library/search',
        params: {term: search, types: 'library-songs', offset: '0', limit: '300'},
      };

    axios.request(options).then(function (response) {
        var reply=response.data;
        var obj = JSON.parse(reply);
        printValues(obj);
        alert(obj["result"]["library-songs"]["data"]["attributes"]["name"]);
    }).catch(function (error) {
        console.error(error);
    });
    
});


app.listen(port, () => console.log(`Server is runing on port ${port}!`))
