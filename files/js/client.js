var socket = io();
var clients = [];
var name = prompt("გთხოვთ შეიყვანოთ თქვენი სახელი");
var id = Math.round(Math.random()*2500);

socket.on('connect', function (data) {
    socket.emit('storeClientInfo', { customName: name });
    clients.push({name: name, id: socket.id});
    console.log(clients);
    userName = name;
    gameLobby.playerList = clients;
    console.log(gameLobby.playerList);
    gameLobby.definePlayers();
});

document.getElementsByClassName("createGameButton")[0].addEventListener("click", function(){
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
});

document.getElementsByClassName("createGameModal-close")[0].addEventListener("click", function(){
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
});