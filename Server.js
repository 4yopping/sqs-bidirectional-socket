var net = require("net");

module.exports = function Server(host,sqs,qurl){

    var params = {
        MessageBody: 'Server Created',
        QueueUrl: qurl,
        DelaySeconds: 0
    };
    if(sqs != null){
        sqs.sendMessage(params, function (err, data) {
            if(err) return console.error(error);
        });
    }

    var s = net.createServer(function (conn) {
        console.log("Server: Client connected");

        conn.on("end", function() {
            console.log('Server: Client disconnected');
            var p = {
                    MessageBody:'Server: Client disconnected',
                    QueueUrl: qurl
                };
            if(sqs != null){
                sqs.sendMessage(p,function (err,data) {
                    if(err) return console.log(err);
                });
            }
        });

        conn.on("data", function(data) {
            data = JSON.parse(data);
            console.log("Client(%s): %s", data.cid, data.response);
            //console.info(data);
            var p = {
                MessageBody:'Server: Response from Client '+data.cid+': '+data.response,
                QueueUrl: qurl
            };
            if(sqs != null){
                sqs.sendMessage(p,function (err,data) {
                    if(err) return console.log(err);
                });
            }
            setTimeout(function(){
                conn.write(JSON.stringify({response:'pong'}));
            }.bind(this),Math.round(Math.random()*1800)+1800);
        });

        conn.write(JSON.stringify({response:'pong'}));

    });

    s.listen(61337, host, function () {
        console.log("Server: Listening");
            var p = {
                    MessageBody:'Server: Listening ' + host,
                    QueueUrl: qurl
                };
            sqs.sendMessage(p,function (err,data) {
                if(err) return console.log(err);
            });
    });
}
