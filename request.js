var EventEmitter = require('events').EventEmitter;
var Response = require('./response');

var Request = module.exports = function (xhr, params) {
    var self = this;
    self.xhr = xhr;
    self.body = '';
    
    var uri = params.host + ':' + params.port + (params.path || '/');
    
    if (params.headers) {
        Object.keys(params.headers).forEach(function (key) {
            var value = params.headers[key];
            if (Array.isArray(value)) {
                value.forEach(function (v) {
                    xhr.setRequestHeader(key, v);
                });
            }
            else xhr.setRequestHeader(key, value)
        });
    }
    
    //xhr.multipart = params.multipart;
    xhr.open(params.method || 'GET', 'http://' + uri, true);
    
    var res = new Response;
    xhr.onreadystatechange = function () {
        if (this.readyState === 2) {
            self.emit('response', res);
        }
        res.response(this);
    };
};

Request.prototype = new EventEmitter;

Request.prototype.write = function (s) {
    this.body += s;
};

Request.prototype.end = function () {
    this.xhr.send(this.body);
};
