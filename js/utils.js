'use strict'

/////////////CREATE/////////////


//creates an empty square (length x length) board
//returns the created board
function createSquareBoard(length) {
    var board = []
    for (var i = 0; i < length; i++) {
        board.push([])
        for (var j = 0; j < length; j++) {
            board[i][j] = {
                isBomb: false,
                isFlag: false,
                isClicked: false,
                neighborBombs: null
            }
        }
    }
    return board
}


/////////////////RENDER/////////////////


// Render the board to an HTML table
function renderBoard(board) {
    const elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            var cellId = `cell-${i}-${j}`

            strHTML += `\t<td id="${cellId}" class="cell" onmousedown="onCellClicked(event,this)">\n`
            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    // console.log('strHTML\n', strHTML)
    elBoard.innerHTML = strHTML
}


//Using the location of a Cell element, render a value in that element
function renderCell(location, str = '') {
    const elCell = location
    var strValue = str

    if (str === 'bomb') strValue = BOMB
    if (str === 'flag') strValue = FLAG

    elCell.innerHTML = strValue
}


function renderFlagsRemain(amount) {
    const elRemainingFlags = document.querySelector('.my-flags')
    var flagsStr = `(${amount} flags left)`
    for (var i = 0; i < amount; i++) flagsStr += FLAG
    elRemainingFlags.innerHTML = flagsStr
}
function renderLivesRemain(amount) {
    const elRemainingLives = document.querySelector('.my-lives')
    var livesStr = `(${amount} lives left)`
    for (var i = 0; i < amount; i++) livesStr += BOMB
    elRemainingLives.innerHTML = livesStr
}
function renderHintsRemain(amount) {
    const elRemainingHints = document.querySelector('.my-hints')
    var hintsStr = `(${amount} hints left)`
    for (var i = 0; i < amount; i++) hintsStr += HINT
    elRemainingHints.innerHTML = hintsStr
}
function renderRestartSmiley(str = 'default') {
    var elClass = document.querySelector('.restart')
    var smileyFace
    if (str === 'default') smileyFace = START
    if (str === 'You Win') smileyFace = WIN
    if (str === 'You Lose') smileyFace = LOSE
    elClass.innerHTML = smileyFace
}


//////////////////COUNTER//////////////////


//gets position as {i:i,j:j}, board, and the neighbor you must find
//returns amount of neighbors AROUND! the position
function gCountNeighborBombs(board, position) {
    var countNigs = 0
    var posIdxI = parseInt(position.i)
    var posIdxJ = parseInt(position.j)
    for (var i = posIdxI - 1; i <= posIdxI + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = posIdxJ - 1; j <= posIdxJ + 1; j++) {
            if (i === posIdxI && j === posIdxJ) continue
            if (j < 0 || j >= board[0].length) continue
            if (board[i][j].isBomb) countNigs++
        }
    }
    return countNigs
}

//counts amount of object in array
//return amount
function gCountClickedCells(board) {
    var objectCounter = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j].isClicked) objectCounter++
        }
    }
    return objectCounter
}


////////////////////FINDER/////////////////////////


//recieves row Index(idxI) and col Index(idxJ)
//finds index in ID inside table
//return Location Element
function gCellElFromId(idxI, idxJ) {
    var elId = document.getElementById(`cell-${idxI}-${idxJ}`)
    return elId
}

// recieves cell element, with id="cell-i-j", returns Pos object {i:i,j:j}
function gPosFromCellElId(elCell) {
    var cellPosStr = elCell.id
    var cellPosArr = cellPosStr.split('-')
    return { i: parseInt(cellPosArr[1]), j: parseInt(cellPosArr[2]) }
}

//get empty cells from board
//return array of indexes with [{i:i,j:j},{i:i,j:j},...] of empty cells
function gEmptyCellsPosArr(board) {
    var posArray = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isBomb) posArray.push({ i: i, j: j })
        }
    }
    return posArray
}

//find an empty cell in board, and return its position like this {i,j}
function gRandomEmptyCellPos(board) {
    var emptyPosArray = gEmptyCellsPosArr(board)
    return emptyPosArray[gRandomIntInclusive(0, emptyPosArray.length - 1)]
}



//////////////////////////////////////////////////////////////////////////////////////////



//return num between min max, including both
function gRandomIntInclusive(min, max) {
    max = Math.floor(max)
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

//input minutes and seconds text into span inside timer class 
function timer() {
    var timer = document.querySelector('.timer span')
    var start = Date.now()
    gGame.timerInterval = setInterval(function () {
        var currTs = Date.now()
        var secs = parseInt((currTs - start) / 1000)
        var ms = (currTs - start) - secs * 1000
        ms = '000' + ms
        ms = ms.substring(ms.length - 2, ms.length)

        timer.innerText = `\t ${secs}:${ms}`
    }, 100)
}


function getMinesweeperNumColor(num) {
    var color
    if (num === 1) color = 'blue'
    if (num === 2) color = 'green'
    if (num === 3) color = 'red'
    if (num === 4) color = 'purple'
    if (num === 5) color = 'maroon'
    if (num === 6) color = 'turquoise'
    if (num === 7) color = 'black'
    if (num === 8) color = 'darkgray'
    return color
}


//////////////////////////////////////////////////////////////////////////////////////////






