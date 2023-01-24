// create variables for x and o
const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';
// create table reprisenting the combinations to win
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*save all elements from html, queryselector to get the first element
in the document that matches.[] to target data-cell */
const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');
let isPlayer_O_Turn = false;

startGame();
if (restartButton) {
    restartButton.addEventListener('click', startGame);
}
// creat start game and remove players from previous game
function startGame() {
    isPlayer_O_Turn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(PLAYER_X_CLASS);
        cell.classList.remove(PLAYER_O_CLASS);
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, {once: true})
    })
    console.log("start");
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}
// handles mouse click and decides whos turn it is , aslo check if someone has won
function handleCellClick(e) {
    const cell = e.target;
    const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
    console.log("cell click");
}
// ends the game and displayes the result of the game
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Its a draw!";
    } else {
      winningMessageTextElement.innerText = 'Player with ${isPlayer_O_Turn ? "Os" : "Xs"} wins!';
    }
    winningMessageElement.classList.add('show');
    console.log("ENDGAME");
}
//this is used when there is a draw
function isDraw() {
    return [...cellElements].every(cell =>{
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
    })
}
// places chacters in cell
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    console.log("placemark");
}
//swap turns once character is placed
function swapTurns(){
    isPlayer_O_Turn = !isPlayer_O_Turn;
    console.log("swapTurns");
}
// makes a hovering effect
function setBoardHoverClass() {
    boardElement.classList.remove(PLAYER_X_CLASS);
    boardElement.classList.remove(PLAYER_O_CLASS);
    if (isPlayer_O_Turn) {
        boardElement.classList.add(PLAYER_O_CLASS);
    } else {
        boardElement.classList.add(PLAYER_X_CLASS);
    }
    console.log("board hover");
}
//calls check if board matches
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}
