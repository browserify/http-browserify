# http-browserify-xdr

The
[http](http://nodejs.org/docs/v0.4.10/api/all.html#hTTP) module from browserify,
but for browsers that can only do cross-origin requests with XDomainRequest (IE8 & IE9).

The out-of-the-box [http-browserify] does not work for cross-origin requests with XDomainRequest, and [an open issue](https://github.com/substack/http-browserify/pull/3) has gone unresponded to for almost 3 years.

Use this in your browserify project by adding the following to your package.json:
```json
"browser": {
    "http": "http-browserify-xdr"
}
```

Note: XDomainRequests [cannot send cookies](http://bit.ly/ie9nocors), so 'withCredentials' options will be ignored. The way to do cross-origin requests withCredentials in these browsers is, well, you can't. You have to open an iframe serving a src on the origin you want to request, then postMessage into it, have it make the request, then postMessage the response out. See [sockjs-client](https://github.com/sockjs/sockjs-client#supported-transports-by-browser-html-served-from-http-or-https) for a referenc eimplementation of that.

The following is the original http-browserify README because the API is the same.

# example

``` js
var http = require('http');

http.get({ host: 'anotherorigin.com', path : '/beep' }, function (res) {
    var div = document.getElementById('result');
    div.innerHTML += 'GET /beep<br>';
    
    res.on('data', function (buf) {
        div.innerHTML += buf;
    });
    
    res.on('end', function () {
        div.innerHTML += '<br>__END__';
    });
});
```

# http methods

var http = require('http');

## var req = http.request(opts, cb)

where `opts` are:

* `opts.method='GET'` - http method verb
* `opts.path` - path string, example: `'/foo/bar?baz=555'`
* `opts.headers={}` - as an object mapping key names to string or Array values
* `opts.host=window.location.host` - http host
* `opts.port=window.location.port` - http port
* `opts.responseType` - response type to set on the underlying xhr object

The callback will be called with the response object.

## var req = http.get(options, cb)

A shortcut for

``` js
options.method = 'GET';
var req = http.request(options, cb);
req.end();
```

# request methods

## req.setHeader(key, value)

Set an http header.

## req.getHeader(key)

Get an http header.

## req.removeHeader(key)

Remove an http header.

## req.write(data)

Write some data to the request body.

## req.end(data)

Close and send the request body, optionally with additional `data` to append.

# response methods

## res.getHeader(key)

Return an http header, if set. `key` is case-insensitive.

# response attributes

* res.statusCode, the numeric http response code
* res.headers, an object with all lowercase keys

# compatibility

This module has been tested and works with:

* Internet Explorer 5.5, 6, 7, 8, 9
* Firefox 3.5
* Chrome 7.0
* Opera 10.6
* Safari 5.0

Multipart streaming responses are buffered in all versions of Internet Explorer
and are somewhat buffered in Opera. In all the other browsers you get a nice
unbuffered stream of `"data"` events when you send down a content-type of
`multipart/octet-stream` or similar.

# protip

You can do:

````javascript
var bundle = browserify({
    require : { http : 'http-browserify-xdr' }
});
````

in order to map "http-browserify-xdr" over `require('http')` in your browserified
source.

# install

With [npm](https://npmjs.org) do:

```
npm install http-browserify-xdr
```

# license

MIT
