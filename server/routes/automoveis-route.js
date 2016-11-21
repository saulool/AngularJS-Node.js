'use strict';

var request = require('request');
var qs = require('querystring');

module.exports = function(app){
  app.get('/api/automoveis', function (req, res) {

    connection.query('SELECT * FROM automoveis', function(err, rows, fields) {
      if (err) throw err;

      res.send(JSON.stringify(rows));
    });

  });
}