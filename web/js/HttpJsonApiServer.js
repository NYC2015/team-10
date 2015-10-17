var http = require('http');
var urlModule = require('url');
var mysql = require('mysql');
var qs = require('querystring');
var port = parseInt(process.argv[2], 10);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'rocktheearth',
});
connection.connect();

var server = http.createServer(function(request, response) {
    var buffer = '';
    request.on('data', function(data) {
        buffer += data;
    });
    request.on('end', function() {
        response.writeHead(200, {'content-type': 'application/json'});
        var urlObj = urlModule.parse(request.url, true);
        var jsonObj = {};
        if (urlObj.pathname === '/api/getcampaign') {
            //an example of processing GET data
            var pk = urlObj.query.pk;
            connection.query('select title, description from campaign where pk=' + pk + ';',
                function(err, rows, fields) {
                    if (err) {
                        throw err;
                    }
                    jsonObj.title = rows[0].title;
                    jsonObj.description = rows[0].description;
                    response.write(JSON.stringify(jsonObj));
                    response.end();
                });
        } else if (urlObj.pathname === '/api/getuser') {
            var pk = urlObj.query.pk;
            connection.query('select name, email, zip from campaign where pk=' + pk + ';',
                function(err, rows, fields) {
                    if (err) {
                        throw err;
                    }
                    jsonObj.name = rows[0].name;
                    jsonObj.email = rows[0].email;
                    jsonObj.zip = rows[0].zip;
                    response.write(JSON.stringify(jsonObj));
                    response.end();
                });
            response.write(JSON.stringify(jsonObj));
            response.end();
        } else if (urlObj.pathname === '/api/insertshortuser') {
            //an example of processing POST data
            if (request.method=='POST') {
                var post = qs.parse(buffer);
                var name = post.name;
                var email = post.email;
                var zip = post.zip;
                connection.query('INSERT INTO user (name, email, zip) VALUES ("' + name + '", "' + email + '", "' + zip + '")', function (err, rows, fields){
                   if(err) throw err;
                });
                //console.log('name:' + name);
                //console.log('email:' + email);
                //var zip = urlObj.query.zip;
            }
            response.write(JSON.stringify(jsonObj));
            response.end();
        } else if (urlObj.pathname === 'api/insertimage') {
            if (request.method=='POST') {
                //UNSUPPORTED

                response.write(JSON.stringify(jsonObj));
                response.end();
            }
        } else if (urlObj.pathname === '/api/insertcampaign') {
            //an example of processing POST data
            if (request.method=='POST') {
                var post = qs.parse(buffer);
                var name = post.title;
                var email = post.description;
                var zip = post.zip;

                connection.query('INSERT INTO campaign (name, email, zip) VALUES ("' + title + '", "' + description + '", "' + zip + '")', function (err, rows, fields) {
                   if(err) throw err;
                });

            }
            response.write(JSON.stringify(jsonObj));
            response.end();
        }
    });
});
server.listen(port);
