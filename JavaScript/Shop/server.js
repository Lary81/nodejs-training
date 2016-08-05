var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    socketio = require('socket.io'),
    io = socketio(server),
    mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
    if (err) return console.log('DB connection failed ' + err);

    app.use(express.static('../dist'));

    app.use('/rest/products', function(request, response, next) {
        db.collection('products').find().toArray(function(err, result) {
            if (err) return console.log('DB read failed');
            response.send({products: result});
            next();
        });
    });

});

io.on('connection', function(clientSocket) {
    console.log('New client connected...');
    setInterval(function() {
       clientSocket.emit('new-data', {lastUpdate: new Date()});
    }, 5000);
});

server.listen(80);
