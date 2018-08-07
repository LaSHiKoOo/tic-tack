var socket = io();

var players = [];
var name = prompt("გთხოვთ შეიყვანოთ თქვენი სახელი");
var id = Math.round(Math.random()*2500);

var gameTables = [];
var winner = "";

var lobby = new gameLobby();
var table = table;
var player;

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

lobby.drawLobby();

socket.on("connect",function(data){
    socket.emit('add user', name);
});
 
socket.on("login" , function(data){ 
    player = new Player(data.username);
    console.log(player);
    players.push(player);
    gameTables = data.tables;
    lobby.playerList = data.players;    
    updateTable(data.numPlayers,data.numTables); 
    drawTables();   
});

socket.on('user joined', (data) => {
    updateTable(data.numPlayers,data.numTables);
    drawTables();
});

socket.on("create table",function(data){
    lobby.tablesList.push(data.lastTable);
    gameTables = data.tables;
    updateTable(data.numPlayers,data.numTables);
    drawTables();
});

socket.on("table joined",function(data){
    for(var i=0; i<gameTables.length; i++){
        if( data.currTable.id == gameTables[i].id ){
            gameTables[i] = data.currTable;
            tbl = gameTables[i];
        }
    }
    if( data.currTable.tableOwner.name == player.name ){
        document.getElementById("playerTwo").innerText = data.currTable.playerTwo.name;
    }else{
        gameTables = data.tables;
        drawTables(); 
    }
   
});

socket.on('user left', (data) => {
    for(var i=0; i<data.tables.length;i++){
        if(data.username === data.tables[i].tableOwner){
            socket.emit('delete table', data.tables[i]);
            break;
        }
    }
    drawTables();
    updateTable(data.numPlayers,data.numTables);
});

socket.on("table deleted",function(data){
    var plTwoName = data.dltTable.playerTwo;
    if( plTwoName == name ){
        alert("მაგიდა გაუქმდა");
        displayLobby();
    }
    gameTables = data.tables;
    drawTables();
});

socket.on('disconnect', (data) => {
    console.log('DISCONNECT');
  });
  
socket.on('reconnect', () => {
    console.log('RECONNECT');
  if (name) {
    socket.emit('add user', name);
  }
});

socket.on('reconnect_error', () => {
    console.log('attempt to reconnect has failed');
  });

document.getElementsByClassName("createGameButton")[0].addEventListener("click", function(){
    var modal = document.getElementById('myModal');
    modal.style.display = "block";
});

document.getElementsByClassName("createGameModal-close")[0].addEventListener("click", function(){
    var modal = document.getElementById('myModal');
    modal.style.display = "none";
});

document.getElementsByClassName("startTableButton")[0].addEventListener("click", function(){
   
    var sel = document.getElementById('gameScores');
    var sel_val = sel.options[sel.selectedIndex].value;
    
    var tableID = Math.round(Math.random()*1000);
    var singleTable = table.createTable(tableID,player,sel_val);

    gameTables.push(singleTable);
    
    displayTable();

    lobby.tablesList = gameTables;
    //lobby.defineTables();

    socket.emit( 'create table', singleTable );  

});

function updateTable(players,tables){
    document.getElementById("playersNum").innerText = players;
    document.getElementById("tablesNum").innerText = tables;
}
function drawSingleTable(tID,plOne,plTwo,mxScore,plOneScore,plTwoScore){    

    var singleTable = document.createElement("div");
    singleTable.classList.add("singleGame");

    var tableID = document.createElement("div");
    tableID.classList.add("tableID");

    var idSpan = document.createElement("span");
    idSpan.innerText = tID;

    tableID.appendChild(idSpan);
    singleTable.appendChild(tableID);

    var tableInfo = document.createElement("div");
    tableInfo.classList.add("tableInfo");
    tableInfo.innerHTML = "&nbsp; - &nbsp;";

    var plOneSpan = document.createElement("span");
    plOneSpan.id = "playerOne";
    plOneSpan.innerText = plOne.name;
    
    tableInfo.prepend(plOneSpan);
    
    var plTwoSpan = document.createElement("span");
    plTwoSpan.id = "playerTwo";
    plTwoSpan.innerText = (plTwo)?plTwo.name:"";

    tableInfo.appendChild(plTwoSpan);
    singleTable.appendChild(tableInfo);

    var maxScore = document.createElement("div");
    maxScore.classList.add("maxScore");

    var maxScoreSpan = document.createElement("span");
    maxScoreSpan.innerText = mxScore;


    maxScore.appendChild(maxScoreSpan);
    singleTable.appendChild(maxScore);
    
    var tableScore = document.createElement("div");
    tableScore.classList.add("tableScore");
    tableScore.innerHTML = "&nbsp; - &nbsp;";

    var plOneScoreSpan = document.createElement("span");
    plOneScoreSpan.innerText = plOneScore;

    tableScore.prepend(plOneScoreSpan);
    
    var plTwoScoreSpan = document.createElement("span");
    plTwoScoreSpan.innerText = plTwoScore;

    tableScore.appendChild(plTwoScoreSpan);
    singleTable.appendChild(tableScore);

    var startGame = document.createElement("div");
    startGame.classList.add("startGame");

    var startGameButton = document.createElement("button");
    startGameButton.classList.add("startGameButton");
    startGameButton.setAttribute("data-tableID", tID);    
    startGameButton.textContent = "თამაში";
    startGameButton.addEventListener("click",function(){
        joinTable(tID);
    });

    startGame.appendChild(startGameButton);
    singleTable.appendChild(startGame);
    
    document.getElementsByClassName("gameBody")[0].appendChild(singleTable);
}
function drawTables(){

    var myNode = document.getElementsByClassName('gameBody')[0];

    while (myNode.childNodes[0]) {
        myNode.removeChild(myNode.firstChild);
    }

    for(var i=0; i<gameTables.length; i++){    
        drawSingleTable( 
            gameTables[i].id,
            gameTables[i].playerOne,
            gameTables[i].playerTwo,
            gameTables[i].maxScore.toString(),
            gameTables[i].playerOneScore,
            gameTables[i].playerTwoScore,
        );
    }
}
function displayLobby(){
    document.getElementsByClassName("gameLobby")[0].style.display = "flex";
    document.getElementsByClassName("gameContainer")[0].style.display = "none";
}
function displayTable(){   
    document.getElementsByClassName("gameLobby")[0].style.display = "none";
    document.getElementById('myModal').style.display = "none";
    document.getElementsByClassName("gameContainer")[0].style.display = "flex";
}
function joinTable(tableId){
    var i=0;
    while( tableId != gameTables[i].id ){
        i++;
    }
    if( gameTables[i].playersNum < 2 ){

        var singleTable = table.createTable(gameTables[i].id,gameTables[i].tableOwner,gameTables[i].maxScore);

        singleTable.addPlayer(player);

        displayTable();

        socket.emit("join table", singleTable );

    }else{
        alert( "მაგიდაზე მოთამაშეების რაოდენობა შევსებულია.");
    }
}
