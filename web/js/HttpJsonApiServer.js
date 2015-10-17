var http = require('http');
var urlModule = require('url');
var mysql = require('mysql');
//var express = require('express');
//var app = express();
var port = parseInt(process.argv[2], 10);

/*
app.use(express.cookieParser());
app.use();

app.post('/login', function(req, res) {
    if (!user) {
      res.render('login.jade', { error: 'Invalid email or password.' });
    } else {
      if (req.body.password === user.password) {
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        res.render('login.jade', { error: 'Invalid email or password.' });
      }
    }
});
*/

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

        }
    });
});
server.listen(port);
