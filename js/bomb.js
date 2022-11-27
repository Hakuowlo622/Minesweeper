'use strict'


var gBombs = []//[{i:i, j:j},...]



function createBombs(board) {
    var bombCounter = gGame.gameMode.mineTotal
    for (var i = 0; i < bombCounter; i++) {
        createBomb(board)
    }
    console.log('gBombs', gBombs)
}

function createBomb(board) {
    var emptyPosArray = gEmptyCells(board)
    var emptyPos = gRandomIntInclusive(0, board.length ** 2 - 1)
    var emptyIdxI = emptyPosArray[emptyPos].i
    var emptyIdxJ = emptyPosArray[emptyPos].j

    gBombs.push({ i: emptyIdxI, j: emptyIdxJ })
    emptyPosArray = []

}

function renderBombs(board) {
    var bombCounter = gGame.gameMode.mineTotal
    for (var i = 0; i < bombCounter; i++) {
        board[gBombs[i].i][gBombs[i].j] = BOMB
    }
}

function checkIfBomb(row, col) {
    for (var counter = 0; counter < gBombs.length; counter++) {
        if (gBombs[counter].i === row, gBombs[counter].j = col) return true
    }
    return false
}

function clearBombs(amount){
    gBombs.splice(0,amount)
}