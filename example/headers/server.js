var express = require('express');
var app = express.createServer();
app.use(express.static(__dirname));

app.get('/beep', function (req, res) {
    res.setHeader('content-type', 'text/plain');
    res.setHeader('foo', 'bar');
    res.setHeader('bling', req.headers.bling + '-blong');
    
    res.end('boop');
});

var browserify = require('browserify');
var bundle = browserify({
    entry : __dirname + '/main.js',
    require : { http : 'http-browserify' },
    watch : true
});
app.use(bundle);

console.log('Listening on :8082');
app.listen(8082);
