var http = require('http');

http.get({ path : '/beep' }, function (res) {
    var div = document.getElementById('result');
    
    res.on('data', function (buf) {
        div.innerHTML += buf;
    });
    
    res.on('end', function () {
        div.innerHTML += '!';
    });
});
