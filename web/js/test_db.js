var mysql = require('mysql');
var express = require('express');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'rockearth',
});

connection.connect(function(err) {
    if (err) {
        console.log('ERROR connecting');
        throw err;
    }
});

connection.query('select * from testtable;', function(err, rows, fields) {
    if (err) {
        console.log('ERROR querying');
        throw err;
    }
    console.log('Results: ', rows[0].name);
});

console.log('DONE');
connection.end();
