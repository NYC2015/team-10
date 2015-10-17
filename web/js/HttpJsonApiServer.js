var http = require('http');
var urlModule = require('url');
var mysql = require('mysql');
var qs = require('querystring');
var port = parseInt(process.argv[2], 10);
var mv = require('mv');
var path = require('path');
//var express = require('express');
//var app = express();

//app.use(express.bodyParser());
//app.use(express.cookieParser());
//app.use();

/*
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

/*
app.post('/api/insertshortuser', function(req, res) {
    console.log(req.body.name);
    console.log(req.body.email);
});
*/

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

                console.log('name:' + name);
                console.log('email:' + email);
                //var zip = urlObj.query.zip;
            }
            response.write(JSON.stringify(jsonObj));
            response.end();
        } else if (urlObj.pathname === '/api/insertcampaign') {
            //an example of processing POST data
            if (request.method=='POST') {
                var post = qs.parse(buffer);
                var title = post.title;
                var description = post.description;
                var zip = post.zip;

                connection.query('INSERT INTO campaign (title, description, zip) VALUES ("' + title + '", "' + description + '", "' + zip + '")', function (err, rows, fields){
                   if(err) throw err; 
                });

            }
            response.write(JSON.stringify(jsonObj));
            response.end();
        }
    });
});
server.listen(port);
