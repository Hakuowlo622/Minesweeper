'use strict'


function createBombs(game, board) {
    var bombCounter = game.gameMode.mineTotal
    for (var i = 0; i < bombCounter; i++) createBomb(board)
}

function createBomb(board) {
    var emptyCellPos = gRandomEmptyCellPos(board)
    board[emptyCellPos.i][emptyCellPos.j].isBomb = true
}

function setBombCountAroundCell(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].neighborBombs = gCountNeighborBombs(board, { i: i, j: j })
        }
    }
}
