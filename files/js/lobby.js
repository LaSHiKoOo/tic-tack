class gameLobby{
    constructor(){
        this.tablesList = [];
        this.playerList = [];
    }

    definePlayers(){
        var playersNum = this.playerList.length;
        document.getElementById("playersNum").innerText = playersNum;
    }

    defineTables(){
        var tablesNum = this.tablesList.length;
        document.getElementById("tablesNum").innerText = tablesNum;
    }

    drawLobby(){

        /* ---------- მაგიდების მხარე ---------- */ 

        var gameLobby = document.createElement("div");
        gameLobby.classList.add("gameLobby");

        var gameTables = document.createElement("div");
        gameTables.classList.add("gameTables");

        var gameTH = document.createElement("div");
        gameTH.classList.add("gameTH");

        var gameBody = document.createElement("div");
        gameBody.classList.add("gameBody");        
        
        var tableID = document.createElement("div");
        tableID.classList.add("tableID"); 

        var idSpan = document.createElement("span");
        idSpan.innerText = "ID";

        tableID.appendChild(idSpan);
        
        var tableInfo = document.createElement("div");
        tableInfo.classList.add("tableInfo"); 

        var infoSpan = document.createElement("span");
        infoSpan.innerText = "მოთამაშეები";

        tableInfo.appendChild(infoSpan);
        
        var maxScore = document.createElement("div");
        maxScore.classList.add("maxScore"); 

        var mScoreSpan = document.createElement("span");
        mScoreSpan.innerText = "ხელი";

        maxScore.appendChild(mScoreSpan);
        
        var tableScore = document.createElement("div");
        tableScore.classList.add("tableScore"); 

        var scoreSpan = document.createElement("span");
        scoreSpan.innerText = "ანგარიში";

        tableScore.appendChild(scoreSpan);
        
        var startGame = document.createElement("div");
        startGame.classList.add("startGame"); 

        var gmSpan = document.createElement("span");
        gmSpan.innerText = "თამაში";

        startGame.appendChild(gmSpan);

        
        gameTH.appendChild(tableID);
        gameTH.appendChild(tableInfo);
        gameTH.appendChild(maxScore);
        gameTH.appendChild(tableScore);
        gameTH.appendChild(startGame);
        
        gameTables.appendChild(gameTH);
        gameTables.appendChild(gameBody);
        gameLobby.appendChild(gameTables);

        /* ---------- მომხმარებლის მხარე ---------- */ 
        
        var userInfo = document.createElement("div");
        userInfo.classList.add("userInfo");
        
        var createGame = document.createElement("div");
        createGame.classList.add("createGame");

        var createGameBtn = document.createElement("button");
        createGameBtn.classList.add("createGameButton");
        createGameBtn.innerText = "ახალი მაგიდა";

        var gameInfo = document.createElement("div");
        gameInfo.classList.add("gameInfo");

        var gameUL = document.createElement("ul");

        var firstLI = document.createElement("li");
        firstLI.innerText = "მომხმარებელი: ";

        var firstSpan = document.createElement("span");
        firstSpan.id = "playersNum";

        firstLI.appendChild(firstSpan);

        var secondLI = document.createElement("li");
        secondLI.innerText = "მაგიდა: ";

        var secondSpan = document.createElement("span");
        secondSpan.id = "tablesNum";

        secondLI.appendChild(secondSpan);

        gameUL.appendChild(firstLI);
        gameUL.appendChild(secondLI);
        
        gameInfo.appendChild(gameUL);
        
        createGame.appendChild(createGameBtn);
        userInfo.appendChild(createGame);
        userInfo.appendChild(gameInfo);
        gameLobby.appendChild(userInfo);


        document.getElementsByTagName("BODY")[0].prepend(gameLobby);

        this.drawModal();
    }

    drawModal(){

            /* --- MODAL -- */

        var modal = document.createElement("div");
        modal.id = "myModal";
        modal.classList.add("createGameModal");

            /* --- CONTENT --- */ 

        var modalContent = document.createElement("div");
        modalContent.classList.add("createGameModal-content");

            /* --- HEADER --- */

        var modalHeader = document.createElement("div");
        modalHeader.classList.add("createGameModal-header");

        var closeSpan = document.createElement("span");
        closeSpan.classList.add("createGameModal-close");
        closeSpan.innerHTML = "&times;";

        var h2 = document.createElement("h2");
        h2.innerText = " ახალი მაგიდის შექმნა";


        modalHeader.appendChild(closeSpan);
        modalHeader.appendChild(h2);      

            /* --- BODY --- */

        var modalBody = document.createElement("div");
        modalBody.classList.add("createGameModal-body");

        var mBodySpan = document.createElement("span");
        mBodySpan.innerText = "ქულების რაოდენობა: ";

        var scoresSel = document.createElement("select");
        scoresSel.id = "gameScores";
        scoresSel.name = "gameScores";

        var firstOpt = document.createElement("option");
        firstOpt.value = "1";
        firstOpt.text = "1";
        
        var secondOpt = document.createElement("option");
        secondOpt.value = "2";
        secondOpt.text = "2";
        
        var thirdOpt = document.createElement("option");
        thirdOpt.value = "3";
        thirdOpt.text = "3";
        
        var fourthOpt = document.createElement("option");
        fourthOpt.value = "4";
        fourthOpt.text = "4";
        
        var fifthOpt = document.createElement("option");
        fifthOpt.value = "5";
        fifthOpt.text = "5";
        
        scoresSel.options.add(firstOpt);        
        scoresSel.options.add(secondOpt);        
        scoresSel.options.add(thirdOpt);        
        scoresSel.options.add(fourthOpt);        
        scoresSel.options.add(fifthOpt);

        modalBody.appendChild(mBodySpan);
        modalBody.appendChild(scoresSel);

            /* --- FOOTER --- */
             
        var modalFooter = document.createElement("div");
        modalFooter.classList.add("createGameModal-footer");

        var createBtn = document.createElement("button");
        createBtn.classList.add("startTableButton");
        createBtn.innerText = "მაგიდის შექმნა";

        modalFooter.appendChild(createBtn);
        
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        modal.appendChild(modalContent);

        document.getElementsByTagName("BODY")[0].appendChild(modal);
    }
}