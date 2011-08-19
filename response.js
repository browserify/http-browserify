var EventEmitter = require('events').EventEmitter;

var Response = module.exports = function (res) {
    this.offset = 0;
};

Response.prototype = new EventEmitter;

Response.prototype.response = function (res) {
    this.statusCode = res.status;
    if (res.readyState === 3) {
        this.write(res);
    }
    else if (res.readyState === 4) {
        this.write(res);
        
        if (res.error) {
            this.emit('error', res.responseText);
        }
        else this.emit('end');
    }
};

Response.prototype.write = function (res) {
    if (res.responseText.length > this.offset) {
        this.emit('data', res.responseText.slice(this.offset));
        this.offset = res.responseText.length;
        this.emit('end');
    }
};

Response.prototype.end = function () {
    this.emit('end');
};
