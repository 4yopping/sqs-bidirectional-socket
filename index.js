var cluster = require('cluster'),
    Server = require('./Server'),
    Client = require('./Client'),
    os = require('os'),
    count = os.cpus().length,
    workers = {};
function spawn(id){
    console.log('Spawning a new Client');
    var wenv = {wid:id};
    var worker = cluster.fork(wenv);
    workers[worker.pid] = worker;
    return worker;
}

if(cluster.isMaster) {
    var server = new Server();
    for(var i = 0; i < count; i++){
        spawn(i);
    }
    cluster.on('death',function(worker){
        delete workers[worker.pid];
        spawn();
    });
} else {
    var c = new Client(process.env['wid']);
}

