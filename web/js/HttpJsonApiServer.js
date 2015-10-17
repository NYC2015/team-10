var http = require('http');
var urlModule = require('url');
var port = parseInt(process.argv[2], 10);
var server = http.createServer(function(request, response) {
    var buffer = '';
    request.on('data', function(data) {
        buffer += data;
    });
    request.on('end', function() {
        response.writeHead(200, {'content-type': 'application/json'});
        var urlObj = urlModule.parse(request.url, true);
        var d = new Date(urlObj.query.iso);
        var jsonObj = {};
        if (urlObj.pathname === '/api/parsetime') {
            jsonObj.hour = d.getHours();
            jsonObj.minute = d.getMinutes();
            jsonObj.second = d.getSeconds();
        } else if (urlObj.pathname === '/api/unixtime') {
            jsonObj.unixtime = d.getTime();
        }
        response.write(JSON.stringify(jsonObj));
        response.end();
    });
});
server.listen(port);
