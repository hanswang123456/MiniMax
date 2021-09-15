function start(){
    document.getElementById("board").style.zIndex = 0;
    document.getElementById("loadScreen").style.zIndex = -1;
    document.getElementById("loadScreen").style.display = "none";
}




var simpleBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
var resultBoard = document.getElementById("result");
var winner = null;
var gameState = {
    turn: "X",
    value: -1
};
var gameRunning = true;
var clickX, clickY;
var aiCheck = 0;

var board;
function startGame() {
    board = document.getElementById("board");
    for (let i = 0; i < 3; i++) {
        var rowWorkingOn = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            var square = document.createElement("td");
            square.id = j + "_" + i;
            square.onclick = function () { placePiece(this.id); };
            rowWorkingOn.appendChild(square);
        }
        board.appendChild(rowWorkingOn);
    }
}
startGame();
aiMakeMove();

function aiMakeMove(){
    let bestScore = 100;
    let bestMove;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (simpleBoard[j][i] == 0) {
                //aiCheck++;
                simpleBoard[j][i] = -1;
                let score = minimax(simpleBoard, 0, true);
                //remove marker
                simpleBoard[j][i] = 0;
                if (score < bestScore) {
                    bestScore = score;
                    bestMove = [i, j];
                }
            }
        }
    }
    placePiece(bestMove[0] + "_" + bestMove[1]);
}

function checkWinner() {
    winner = null;
    let finished = true;
    for (let i = 0; i < 3; i++) {
        if (simpleBoard[i][0] === 1 && simpleBoard[i][1] === 1 && simpleBoard[i][2] === 1) {
            winner = 1;
            gameRunning = false;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (simpleBoard[0][i] === 1 && simpleBoard[1][i] === 1 && simpleBoard[2][i] === 1) {
            winner = 1;
            gameRunning = false;
        }
    }
    if (simpleBoard[0][0] === 1 && simpleBoard[1][1] === 1 && simpleBoard[2][2] === 1) {
        winner = 1;
        gameRunning = false;
    }
    if (simpleBoard[2][0] === 1 && simpleBoard[1][1] === 1 && simpleBoard[0][2] === 1) {
        winner = 1;
        gameRunning = false;
    }
    for (let i = 0; i < 3; i++) {
        if (simpleBoard[i][0] === -1 && simpleBoard[i][1] === -1 && simpleBoard[i][2] === -1) {
            winner = -1;
            gameRunning = false;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (simpleBoard[0][i] === -1 && simpleBoard[1][i] === -1 && simpleBoard[2][i] === -1) {
            winner = -1;
            gameRunning = false;
        }
    }
    if (simpleBoard[0][0] === -1 && simpleBoard[1][1] === -1 && simpleBoard[2][2] === -1) {
        winner = -1;
        gameRunning = false;
    }
    if (simpleBoard[2][0] === -1 && simpleBoard[1][1] === -1 && simpleBoard[0][2] === -1) {
        winner = -1;
        gameRunning = false;
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (simpleBoard[j][i] == 0) {
                finished = false;
            }
        }
    }
    if (finished == true && winner === null) {
        winner = 0;
        gameRunning = false;
    }
    return winner;
}



function minimax(curB, depth, isMax) {

    let result = checkWinner();
    if (result != null) {
        return result;
    }
    
        if (isMax == true) {
            let bestScore = -100;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    //given blank space, place a +1 marker
                    if (curB[j][i] == 0) {
                        curB[j][i] = 1;
                        //call minimax on new position
                        let score = minimax(curB, depth + 1, false);
                        //remove marker
                        curB[j][i] = 0;
                        bestScore = Math.max(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
        else{
            //initial score
            let bestScore = 100;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (curB[j][i] == 0) {
                        //given blank space, place a -1 marker
                        curB[j][i] = -1;
                        let score = minimax(curB, depth + 1, true);
                        curB[j][i] = 0;
                        bestScore = Math.min(score, bestScore);
                    }
                }
            }
            return bestScore;
        }
    }
function placePiece(coordinate) {
    gameRunning = true;
    winner = null;
    winner = checkWinner();
    clickX = Number(coordinate.substring(0, 1));
    clickY = Number(coordinate.substring(2, 3));
    //valid move and game running
    if (gameRunning == true) {
        if (simpleBoard[clickY][clickX] == 0) {
            //x moving (computer)
            if (gameState.value == -1) {
                //physical SimpleBoard
                document.getElementById(clickX + "_" + clickY).innerHTML = gameState.turn;
                //array SimpleBoard
                simpleBoard[clickY][clickX] = gameState.value;

                gameState.value *= -1;
                gameState.turn = "O";
                return 0;
            }
            //human turn
            else if (gameState.value == 1) {
                //physical SimpleBoard
                document.getElementById(clickX + "_" + clickY).innerHTML = gameState.turn;
                //array SimpleBoard
                simpleBoard[clickY][clickX] = gameState.value;
                gameState.value *= -1;
                gameState.turn = "X";
                aiMakeMove();
            }
        }
    }
    else {
        printWinner();
    }
}
function printWinner() {
    if (gameRunning == false) {
        if (winner == 1) {
            resultBoard.innerHTML = "Player wins";
        }
        else if (winner == -1) {
            resultBoard.innerHTML = "Computer wins";
        }
        else {
            resultBoard.innerHTML = "It's a tie";
        }
    }
    document.getElementById("restart").style.visibility = "visible";
}

function restartGame(){
location.reload();
};
