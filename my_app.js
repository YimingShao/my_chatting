var app = require('http').createServer(response);
var fs = require('fs');
app.listen(8080);
console.log("App running...");


function response(req, res) {
    var file = "";
    if (req.url == "/") {
        file = __dirname + '/index.html';
    } else {
        file = __dirname + req.url;
    }
    fs.readFile(file, function (err, data) {
        if (err) {
            res.writeHead(404);
            return res.end('Page or file not found');
        }
        res.writeHead(200);
        res.end(data);
    });

}



const readFileAsync = () => {
    const fss = require('fs');

    const FILE_NAME = 'data.json';
    fss.readFile(FILE_NAME, (error, data) => {
        const dataJson = JSON.parse(data);
        console.log(dataJson);
    });
};
