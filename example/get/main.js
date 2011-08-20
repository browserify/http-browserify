var http = require('http');

http.get({ path : '/beep' }, function (res) {
    var div = document.getElementById('result');
    
    div.innerHTML += JSON.stringify(res.headers) + '<br>';
    
    res.on('data', function (buf) {
        div.innerHTML += buf;
    });
    
    res.on('end', function () {
        div.innerHTML += '!';
    });
});
