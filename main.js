var http = require("http");
var crush = require("./firstcrush.js");
var escapeHtml = require('escape-html');
var fs = require("fs");
//var UglifyJS = require("uglify-js2")

http.createServer(function (req, res) {
    var templateHtml = fs.readFileSync("./client/template.html", "utf8");
    var uncrushedJs = fs.readFileSync("./client/main.js", "utf8");

    var parsedUrl = require('url').parse(req.url);
    var js = (parsedUrl.pathname == "/crush") ? crush.crush(uncrushedJs) : uncrushedJs
    var jsByteCount = crush.byteCount(js);

    var html = templateHtml.replace(/%%escaped_script%%/g, escapeHtml(js))
        .replace(/%%script_size%%/, jsByteCount)
        .replace(/\/\*%%script%%\*\//, js);
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
}).listen(1337, "127.0.0.1");

console.log("Server running at http://127.0.0.1:1337/");