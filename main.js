var http = require('./xhr');

http.get({ path : '/doom' }, function (res) {
    res.on('data', function (buf) {
        console.log('buf = ' + buf);
    });
    res.on('end', function () {
        console.log('end!');
    });
});
