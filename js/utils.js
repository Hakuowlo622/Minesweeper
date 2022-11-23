'use strict'

// Returns the class name for a specific cell
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}










//return num between min max, including both
function gRandomIntInclusive(min, max) {
    max = Math.floor(max)
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1) + min)
}



//get empty cells from board
function gEmptyCells(board) {
    var posArray=[]
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
             if (board[i][j]==='') posArray.push({i,j})
        }
    }
    return posArray
}





