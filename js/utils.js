'use strict'



function countNeighbors(location, board, neighbor) {
    var countNigs = 0
    // console.log('location', location)
    // console.log('location.i', location.i)
    // console.log('location.j', location.j)

    var posIdxI = parseInt(location.i)
    var posIdxJ = parseInt(location.j)
    for (var i = posIdxI - 1; i <= posIdxI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = posIdxJ - 1; j <= posIdxJ + 1; j++) {
            if (i === posIdxI && j === posIdxJ) continue
            if (j < 0 || j >= board[0].length) continue

            if (board[i][j] === neighbor) {
                countNigs++
            }
            // console.log('i,j', i, j)
        }
    }
    return countNigs
}




//return num between min max, including both
function gRandomIntInclusive(min, max) {
    max = Math.floor(max)
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1) + min)
}



//get empty cells from board
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




