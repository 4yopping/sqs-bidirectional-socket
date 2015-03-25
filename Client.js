var net = require("net"),
    socket = new net.Socket();

var Client = function Client(id){
    console.log('new Client::',id);
    this._cid = id;
    socket.connect(61337, "localhost", function () {
        console.log("Client: Connected to server");
    });

    // Let's handle the data we get from the server
    socket.on("data", function (data) {
        data = JSON.parse(data);
        console.log("(",this._cid,")Response from server: %s", data.response);
        // Respond back
        socket.write(JSON.stringify({ response: "ping", cid: this._cid }));
    }.bind(this));
};
module.exports = Client; 
