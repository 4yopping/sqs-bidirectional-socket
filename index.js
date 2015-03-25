var cluster = require('cluster'),
    Server = require('./Server'),
    Client = require('./Client'),
    os = require('os'),
    AWS = require('aws-sdk'),
    sqs = new AWS.SQS({apiVersion: 'latest',region:'us-east-1'}),
    count = os.cpus().length,
    workers = {},
    host = 'localhost',
    qurl = 'https://sqs.us-east-1.amazonaws.com/079577709174/test';

function spawn(id){
    console.log('Spawning a new Client');
    var wenv = {wid:id};
    var worker = cluster.fork(wenv);
    workers[worker.pid] = worker;
    return worker;
}

if(cluster.isMaster) {
    var server = new Server(host,sqs,qurl);
    for(var i = 0; i < count; i++){
        spawn(i);
    }
    cluster.on('death',function(worker){
        var wid = worker.process.env['wid'];
        delete workers[worker.pid];
        spawn(wid);
    });
} else {
    var c = new Client(process.env['wid'],host);
}

