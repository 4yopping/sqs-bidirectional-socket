var net = require("net");

module.exports = function Server(){ 

    // Create a simple server
    var s = net.createServer(function (conn) {
        console.log("Server: Client connected");

        // If connection is closed
        conn.on("end", function() {
            console.log('Server: Client disconnected');
        });

        // Handle data from client
        conn.on("data", function(data) {
            data = JSON.parse(data);
            //console.log("Client(%s): %s", data.cid, data.response);
            console.info(data);
            setTimeout(function(){
                conn.write(JSON.stringify({response:'pong'}));
            }.bind(this),Math.round(Math.random()*1800)+1800);
        });

        conn.write(JSON.stringify({response:'pong'}));
        
    });
    // Listen for connections
    s.listen(61337, "localhost", function () {
        console.log("Server: Listening");
    });
}
