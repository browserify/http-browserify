var http = require('http');

http.get({ path : '/doom' }, function (res) {
    var div = document.getElementById('result');
    div.innerHTML += res.statusCode + ': ';
    if (!div.style) div.style = {};
    
    div.style.color = 'rgb(80,80,80)';
    
    res.on('data', function (buf) {
        div.innerHTML += buf;
    });
    
    res.on('end', function () {
        div.style.color = 'black';
        div.innerHTML += '!';
    });
});
