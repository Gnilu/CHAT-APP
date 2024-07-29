var express = require("express");
const{ listen } = require("socket.io");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
users = [];
connections = [];
server.listen(3001);
app.get('/', function(req,res){
    //routes for localhost:3001
    res.sendFile(__dirname + "/index.html");

})
io.on("connection", function(socket){
    //when client connects to server
    connections.push(socket); //add plug details
    console.log("connected: %s socket connected", connections.length);
    socket.on("disconnect", function(data){
        //client disc. from server
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected : %s socket connected", connections.length);

    }) ;
    socket.on("send message", function(data) {
        console.log(data);
        io.emit("new message", {msg: data});
    });
})

console.log("Server is listening")
