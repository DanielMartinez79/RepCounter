var http = require('http');
var fs = require('fs');
var url = require('url');
var mime = require('mime-types');

http.createServer( function(req, res) {
    var path = url.parse(req.url);
    var file = './public' + path.pathname;
    console.log(file)

    if (file === './public/'){
        file = './public/index.html';
    }
    fs.readFile(file, function(err, data) {
        if (err){
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("Error 404")
        }
        res.writeHead(200, {'Content-Type': mime.lookup(file), });
        res.write(data);
        return res.end();

    });

}).listen(8008);