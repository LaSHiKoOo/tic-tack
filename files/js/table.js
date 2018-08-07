var table = {    
    id: 0,
    playersNum: 0,
    maxPlayersNum: 2,
    tableOwner: "",
    playerOne: "",
    playerTwo: "",
    playerOneSymbol: "X",
    playerTwoSymbol: "O",
    winner: "",
    playerOneScore: 0,
    playerTwoScore: 0,
    maxScore: 0,
    board: [
        [
            { val:'' , class: 'gameBox', bg: '' , id: 11 , free: true }, 
            { val:'' , class: 'gameBox', bg: '' , id: 12 , free: true },
            { val:'' , class: 'gameBox', bg: '' , id: 13 , free: true },
        ],
        [
            { val: '' , class: 'gameBox', bg: '' , id: 21 , free: true },
            { val: '' , class: 'gameBox', bg: '' , id: 22 , free: true }, 
            { val: '' , class: 'gameBox', bg: '' , id: 23 , free: true },
        ],
        [
            { val: '' , class: 'gameBox', bg: '' , id: 31 , free: true }, 
            { val: '' , class: 'gameBox', bg: '' , id: 32 , free: true }, 
            { val: '' , class: 'gameBox', bg: '' , id: 33 , free: true },            
        ]
    ],
    winningBoards: [
        [ 11, 12, 13 ],
        [ 21, 22, 23 ],
        [ 31, 32, 33 ],
        [ 11, 22, 33 ],
        [ 11, 21, 31 ],
        [ 12, 22, 32 ],
        [ 31, 32, 33 ],
        [ 13, 22, 31 ]
    ],
    winnerBoxes: [],

    makeMove: function(box){

        if(this.playerOne.turn){
            console.log(1);
        }
        if(this.playerTwo.turn){
            console.log(2);
        }

        if( this.playerOne && this.playerTwo){
            if(this.playerOne.turn && !this.winner && this.playerOne.name == name ){
    
                console.log(box.getAttribute("data-childId"));     
        
                document.getElementById(box.getAttribute("data-childId")).parentElement.setAttribute("data-isFree",false);
                document.getElementById(box.getAttribute("data-childId")).parentElement.removeEventListener("click" , this.moveFunction , true);
                document.getElementById(box.getAttribute("data-childId")).textContent = this.playerOneSymbol;
                this.playerOne.playerBoxes.push(parseInt(box.getAttribute("data-childId")));
                this.changeTurns();
        
            }else if(this.playerTwo.turn && !this.winner && this.playerTwo.name == name ){
        
                console.log(box.getAttribute("data-childId"));     
        
                document.getElementById(box.getAttribute("data-childId")).parentElement.setAttribute("data-isFree",false);
                document.getElementById(box.getAttribute("data-childId")).parentElement.removeEventListener("click" , this.moveFunction , true);
                document.getElementById(box.getAttribute("data-childId")).textContent = this.playerTwoSymbol;
                this.playerTwo.playerBoxes.push(parseInt(box.getAttribute("data-childId")));
                this.changeTurns();
        
            }else{
                alert("დაელოდეთ თქვენს რიგს");
            }

        }else{
            alert("თამაში ჯერ არ დაწყებულა");
        }
    
        this.checkBoard();
    },

    addPlayer: function(player){
        this.playerTwo = player;
        this.playerOne.turn = !this.playerOne.turn;
        this.playersNum++;
        this.drawGameContainer();
    },

    moveFunction: function(){
        table.makeMove(this);
    },

    createTable: function(id,owner,maxScore){
        this.id = id;
        this.tableOwner = owner;
        this.playerOne = owner;
        this.playersNum++;
        this.maxScore = parseInt(maxScore);
        
        this.drawGameContainer();

        return this;
    },

    drawGameContainer: function(){
        var gameCont = document.createElement("div");
        gameCont.classList.add("gameContainer");
    
        var giBlock = document.createElement("div");
        giBlock.classList.add("gameInfoBlock");
    
        var tableIdBlock = document.createElement("div");
        tableIdBlock.classList.add("tableIdBlock");
        tableIdBlock.innerText = "მაგიდის ID: ";
    
        var idSpan = document.createElement("span");
        idSpan.id = "tableID";
    
        idSpan.innerText = this.id;
    
        var tPlBlock = document.createElement("div");
        tPlBlock.classList.add("tablePlayersBlock");
    
        var plOneSp = document.createElement("span");
        plOneSp.id = "playerOne";
        plOneSp.innerText = this.playerOne.name;
    
        var placeSpan = document.createElement("span");
        placeSpan.innerHTML = "&nbsp; - &nbsp;";
    
        var plTwoSp = document.createElement("span");
        plTwoSp.id = "playerTwo";
        plTwoSp.innerText = (this.playerTwo) ? this.playerTwo.name : "";
    
        var gameBlock = document.createElement("div");
        gameBlock.classList.add("gameBlock");
    
        var gameContent = document.createElement("div");
        gameContent.classList.add("gameContent");
    
        gameBlock.appendChild(gameContent);
    
        tPlBlock.appendChild(plOneSp);
        tPlBlock.appendChild(placeSpan);
        tPlBlock.appendChild(plTwoSp);
        giBlock.appendChild(tPlBlock);
        tableIdBlock.appendChild(idSpan);
        giBlock.appendChild(tableIdBlock);
        gameCont.appendChild(giBlock);
        gameCont.appendChild(gameBlock);
        document.getElementsByTagName("BODY")[0].prepend(gameCont);

        this.drawGameBoxes();
    },

    drawGameBoxes: function(){
        
        var myNode = document.getElementsByClassName('gameContent')[0];
    
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    
        var table = document.createElement("table");
    
        for(var i=0; i<this.board.length;i++){
            var tr = document.createElement("tr");
            for( var j=0; j<this.board[i].length; j++){
    
                var singleBox = document.createElement("td");
                var boxSpan = document.createElement("span");
    
                singleBox.classList.add(this.board[i][j].class);
                boxSpan.id = this.board[i][j].id;
                singleBox.textContent = this.board[i][j].value;
                singleBox.setAttribute("data-childId",this.board[i][j].id);
                singleBox.setAttribute("data-isFree",this.board[i][j].free);
                singleBox.addEventListener("click" , this.moveFunction , true);
                singleBox.appendChild(boxSpan);
                tr.appendChild(singleBox);
            }          
            table.appendChild(tr);  
        }
        document.getElementsByClassName("gameContent")[0].appendChild(table);
    },

    checkPlayerOne: function(){

    var playerArray = [ [],[],[],[],[],[],[],[] ];

        for( var i = 0; i < this.winningBoards.length; i++){

            for( var j = 0; j < this.playerOne.playerBoxes.length; j++ ){

                if( this.winningBoards[i].includes( this.playerOne.playerBoxes[j] ) ){

                    playerArray[i].push( this.playerOne.playerBoxes[j] );

                }

            }

            if( playerArray[i].length == 3){

                console.log( 'PL. W. COLORS:' + playerArray[i] );
                this.winner = this.playerOne.name;
                this.winnerBoxes = playerArray[i];
                console.log( "WINNER: " + this.winner);
                table.changeColor();

            }
        }
    },

    checkPlayerTwo: function(){

        var playerArray = [ [],[],[],[],[],[],[],[] ];
    
        for( var i = 0; i < this.winningBoards.length; i++){
    
            for( var j = 0; j < this.playerTwo.playerBoxes.length; j++ ){
    
                if( this.winningBoards[i].includes( this.playerTwo.playerBoxes[j] ) ){
    
                    playerArray[i].push( this.playerTwo.playerBoxes[j] );
    
                }
    
            }
    
            if( playerArray[i].length == 3){
    
                console.log( 'PL. W. COLORS:' + playerArray[i] );
                this.winner = this.playerTwo.name;
                this.winnerBoxes = playerArray[i];
                console.log( "WINNER: " + this.winner);
                table.changeColor();
    
            }
        }    
    },

    checkBoard: function(){        
    
        table.checkPlayerOne();
        table.checkPlayerTwo();
        
        if( this.winner.length != 0 ){
            for(var i=0; i<this.board.length;i++){
                for( var j=0; j<this.board[i].length; j++){
                    document.getElementById(this.board[i][j].id).parentElement.removeEventListener("click" , this.moveFunction , true);
                }  
            }    
        }
    },

    changeTurns: function(){
        this.playerOne.turn = !this.playerOne.turn;
        this.playerTwo.turn = !this.playerTwo.turn;
    },

    changeColor: function(){
        for(var i=0; i<this.winnerBoxes.length;i++){
            document.getElementById(winnerBoxes[i]).parentElement.classList.add("winnerPos");
        }
    },

    startGame: function(){
        this.drawGameContainer();
        this.drawGameBoxes();
    }
};