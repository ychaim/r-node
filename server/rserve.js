var sys = require("sys");
var binding = require("./binding");

/**
 * Constructor for the connection object
 */
RservConnection = function () {

    this.connection = new binding.Connection;
    this.requests = [];

    var me = this;

    this.connection.addListener("connect", function (l) { me.connected(l); });
    this.connection.addListener("login", function (r) { me.onLoginResult(r); });
    this.connection.addListener("close", function (e) { me.closed(e); });
    this.connection.addListener("result", function (r) { me.result(r); });

    return this;
};

RservConnection.prototype.connect = function (host, port, callback) {
    if (typeof host === "function") {
        this.connectCallback = host;
        host = '127.0.0.1';
        port = 6311;
    } else {
        host = host || '127.0.0.1';
        port = port || 6311;
        this.connectCallback = callback;
    }
    this.connection.connect (host, port);
}

RservConnection.prototype.connected = function (requireLogin) {
    sys.puts ("Connected. Login required: " + requireLogin);
    this.requireLogin = requireLogin;
    if (!requireLogin)
        this.dispatch();
    if (this.connectCallback)
        this.connectCallback(true, requireLogin);
}

RservConnection.prototype.login = function (username, password, callback) {
    if (this.requireLogin) {
        this.loginCallback = callback;
        this.connection.login (username, password);
    } else {
        if (callback)
            callback(true);
    }
}

RservConnection.prototype.onLoginResult = function (result) {
    sys.puts("Login result: " + result);
    if (result)
        this.dispatch();
    if (this.loginCallback)
        this.loginCallback (result);
}

RservConnection.prototype.closed = function (e) {
    sys.puts ("Disconnected from R: " + e);
}
RservConnection.prototype.result = function (r) {
    var finalResponse = r;

    if (r != null) {
        // Work the request data into something more useful.
        if (r.values && r.attributes && r.attributes.names) {
            finalResponse = {};
            finalResponse.data = {};
            for (var counter = 0; counter < r.attributes.names.length; ++counter) {
                finalResponse.data[r.attributes.names[counter]] = r.values[counter];
            }
            for (var v in r) {
                if (v != 'values' && v != 'attributes') {
                    finalResponse[v] = r[v];
                }
            }
            finalResponse.attributes = {};
            for (var v in r.attributes) {
                if (v != 'names') {
                    finalResponse.attributes[v] = r.attributes[v];
                }
            }
        }
    }

    var request = this.requests.shift();
    if (request.callback) {
        request.callback(finalResponse);
    }
    this.dispatch();
}
RservConnection.prototype.request = function (req, callback) {
    this.requests.push ({request: req, callback: callback});
    this.dispatch();
}

RservConnection.prototype.dispatch = function () {
    if (this.requests.length > 0 && this.connection.state == "idle") {
        this.connection.query (this.requests[0].request);
    }
}

//
// Export the RservConnection object.
//
exports.RservConnection = RservConnection;
