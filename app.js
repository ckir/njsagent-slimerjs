//
// Remember. This is a slimerjs application. Not a node.js one
//
var system = require('system');
var env = system.env;
var fs = require('fs');

var huburl = serverurl();
var Promise = require('./node_modules/bluebird/js/browser/bluebird.js');
var Primus = require('./lib//primus.js');
var primus = Primus.connect(huburl);

primus.on('open', function open() {

    console.log('Connection is alive and kicking');

    primus.on('exec', function(data, ret) {

        try {

            eval(data);

        } catch (e) {
            ret({
                sucsess: false,
                error: e
            });
        }

    });

});

primus.on('error', function error(err) {
    console.error('Something horrible has happened', err.stack);
});

function serverurl() {
    var parser = document.createElement('a');
    parser.href = env['NJSSLIMER_HUB'];

    parser.protocol; // => "http:"
    parser.hostname; // => "example.com"
    parser.port; // => "3000"
    parser.pathname; // => "/pathname/"
    parser.search; // => "?search=test"
    parser.hash; // => "#hash"
    parser.host; // => "example.com:3000"
    var port = '';

    if (parser.protocol == 'https:') {
        port = ':8443';
    } else {
        if (parser.port) {
            port = ':' + parser.port;
        }
    }
    var surl = parser.protocol + '//' + parser.hostname + port;
    return surl;
}