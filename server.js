const express = require('express');
const app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

/* --- ფაილებისთვის --- */
app.use(express.static(path.join(__dirname, 'files')));

var players = [];
var tables = [];
var playerID = 0;
var numPlayers = 0;
var numTables = 0;

/* --- მასივიდან ამოშლა --- */

Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};

/* --- სერვერის დაკავშირება --- */


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

server.listen(port, () => {
    console.log('Server listening at port %d', port);
});

io.sockets.on("connection",function(socket){
  var addedUser = false;
  var addedTable = false;

  socket.on("add user",function(username){
    if (addedUser) return;
    
    var singlePlayer = {
      userName: "",
      userID: 0
    }

    socket.username = username;
    singlePlayer.userName = socket.username;
    singlePlayer.userID = ++playerID;
    ++numPlayers;    
    players.push(singlePlayer);
    addedUser = true


    socket.emit('login', {
      username: socket.username,
      numPlayers: numPlayers,
      players: players,
      numTables: numTables,
      tables: tables 
    });
    
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numPlayers: numPlayers,
      players: players,
      numTables: numTables,
      tables: tables 
    });

    socket.on('create table', (data) => {
      if (addedTable) return; 

      var singleTable = data;  
      ++numTables; 

      tables.push(singleTable);
      addedTable = true;
  
      io.sockets.emit('create table', {
        username: socket.username,
        numPlayers: numPlayers,
        players: players,
        numTables: numTables,
        tables: tables
      });  
    });

    socket.on("join table", function(data){

      var i=0;

      while( data.id != tables[i].id ){
          i++;
      }

      tables[i] = data;
  
      socket.broadcast.emit("table joined",{
        username: socket.username,
        numPlayers: numPlayers,
        players: players,
        numTables: numTables,
        tables: tables,
        currTable: data
      });
  
    });

    socket.on('disconnect', () => {
      if (addedUser) {
        --numPlayers;
        players.remove(socket.username);
        
        socket.broadcast.emit('user left', {
          username: socket.username,
          numPlayers: numPlayers,
          players: players,
          numTables: numTables,
          tables: tables 
        });
      }
    });

    socket.on('delete table', function(deletedTable){
    
      var dltTable = deletedTable;
  
      for( var i=0; i<tables.length; i++ ){
        if( deletedTable.id == tables[i].id ){
          var tempTables = tables.remove(tables[i]);
          tables = tempTables;
        }
      }

      socket.broadcast.emit("table deleted",{
        dltTable: dltTable,
        username: socket.username,
        numPlayers: numPlayers,
        players: players,
        numTables: numTables,
        tables: tables 
      });
      
    });

  });  
});
