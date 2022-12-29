'use strict'


//[{i:i, j:j},...]
// var gBombs = []


function createBombs(game, board) {
    var bombCounter = game.gameMode.mineTotal
    for (var i = 0; i < bombCounter; i++) {
        createBomb(board)
    }
}

function createBomb(board) {
    var emptyCellsArr = gEmptyCellsArr(board)
    var randomArrItem = gRandomIntInclusive(0, emptyCellsArr.length - 1)
    var emptyPosRow = emptyCellsArr[randomArrItem].i
    var emptyPosCol = emptyCellsArr[randomArrItem].j
    board[emptyPosRow][emptyPosCol].isBomb = true
}

function setBombCountAroundCell(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].neighborBombs = gCountNeighbors(board, { i: i, j: j })
        }
    }
}

// function renderBombs(board) {
//     var bombCounter = gGame.gameMode.mineTotal
//     for (var i = 0; i < bombCounter; i++) {
//         board[gBombs[i].i][gBombs[i].j] = BOMB
//     }
// }

// function checkIfBomb(row, col) {
//     for (var counter = 0; counter < gBombs.length; counter++) {
//         if (gBombs[counter].i === row, gBombs[counter].j = col) return true
//     }
//     return false
// }

// function clearBombs(amount) {
//     gBombs.splice(0, amount)
// }