var net = require("net"),
    socket = new net.Socket();

var Client = function Client(id,host){
    console.log('new Client::',id);
    this._cid = id;
    socket.connect(61337, host, function () {
        console.log("Client: Connected to server");
    });

    socket.on("data", function (data) {
        data = JSON.parse(data);
        console.log("(",this._cid,")Response from server:", data.response);

        socket.write(JSON.stringify({ response: "ping", cid: this._cid }));
    }.bind(this));
};
module.exports = Client; 
