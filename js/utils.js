'use strict'



//recieves position as {i:i,j:j}, board, and the neighbor you must find
//returns amount of neighbors AROUND! the position
function countNeighbors(position, board, neighbor) {
    var countNigs = 0
    var posIdxI = parseInt(position.i)
    var posIdxJ = parseInt(position.j)
    for (var i = posIdxI - 1; i <= posIdxI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = posIdxJ - 1; j <= posIdxJ + 1; j++) {
            if (i === posIdxI && j === posIdxJ) continue
            if (j < 0 || j >= board[0].length) continue
            if (board[i][j] === neighbor) {
                countNigs++
            }
        }
    }
    return countNigs
}

//recieves row Index(idxI) and col Index(idxJ)
//finds index in ID inside table
//return location
function getCellLocationById(idxI, idxJ) {
    var elId = document.getElementById(`cell-${idxI}-${idxJ}`)
    return elId
}


//return num between min max, including both
function gRandomIntInclusive(min, max) {
    max = Math.floor(max)
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1) + min)
}



//get empty cells from board
//return array of indexes with [{i,j},{i,j},...] of empty cells
function gEmptyCells(board) {
    var posArray = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === '') posArray.push({ i, j })
        }
    }
    return posArray
}


function timer() {
    var timer = document.querySelector('.timer span')
    var start = Date.now()
    gTimerInterval = setInterval(function () {
        var currTs = Date.now()
        var secs = parseInt((currTs - start) / 1000)
        timer.innerText = `\n ${secs}`
    }, 100)
}




//counts amount of clicked in board
//return amount
function gCountClicked(board) {
    var objectCounter = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var elCell = getCellLocationById(i, j)
            if (elCell.dataset.clicked==='true') objectCounter++
        }
    }
    return objectCounter
}



