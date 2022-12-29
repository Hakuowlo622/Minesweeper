'use strict'

/////////////CREATE/////////////


//creates an empty (numOfRows x numOfCols) board
//returns the created board
function createBoard(numOfRows, numOfCols) {
    var board = []
    for (var i = 0; i < numOfRows; i++) {
        board.push([])
        for (var j = 0; j < numOfCols; j++) {
            // board[i][j] = 
        }
    }
    return board
}

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
function renderCell(location, value) {
    const elCell = location
    elCell.innerHTML = value

    /*Also:*/
    // const cellSelector = '.' + getClassName(location) // cell-i-j
    // const elCell = document.querySelector(cellSelector)
    // elCell.innerHTML = value
}


//////////////////COUNTER//////////////////


//gets position as {i:i,j:j}, board, and the neighbor you must find
//returns amount of neighbors AROUND! the position
function gCountNeighbors(board, position) {
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
function gCountIt(board, something) {
    var objectCounter = 0
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === something) objectCounter++
        }
    }
    return objectCounter
}


////////////////////FINDER/////////////////////////


//takes random number from an array of numbers, removes it from the array,
//returns the chosen number
function gDrawRandomNum(numsArray) {
    var idx = gRandomIntInclusive(0, numsArray.length - 1)
    var num = numsArray[idx]
    numsArray.splice(idx, 1)
    return num
}

//recieves row Index(idxI) and col Index(idxJ)
//finds index in ID inside table
//return Location Element
function gCellFromId(idxI, idxJ) {
    var elId = document.getElementById(`cell-${idxI}-${idxJ}`)
    return elId
}

// recieves cell element, with id="cell-i-j", returns Pos object {i:i,j:j}
function gPosFromId(elCell) {
    var cellPosStr = elCell.id
    var cellPosArr = cellPosStr.split('-')
    return { i: cellPosArr[1], j: cellPosArr[2] }
}

//get empty cells from board
//return array of indexes with [{i:i,j:j},{i:i,j:j},...] of empty cells
function gEmptyCellsArr(board) {
    var posArray = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isBomb) posArray.push({ i: i, j: j })
        }
    }
    return posArray
}

//find an empty cell in board, and return its position like this {i,j}
function gRandomEmptyCell(board) {
    var emptyPosArray = gEmptyCellsArr(board)
    return emptyPosArray[gRandomIntInclusive(0, emptyPosArray.length - 1)]
}

// Returns the class name for a specific cell
function gClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
}


//////////////////////////////////////////////////////////////////////////////////////////


//shuffles int Num array
function gShuffleArr(numArray) {
    var numSortedArr = numArray.slice()
    var numShffledArr = []
    for (var i = 0, j = numArray.length; i < numArray.length; i++) {
        var currRandom = gRandomIntInclusive(0, --j)//15
        numShffledArr[i] = numSortedArr[currRandom]//numArray[15]=16
        numSortedArr.splice(currRandom, 1)
    }
    return numShffledArr
}

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
    gTimerInterval = setInterval(function () {
        var currTs = Date.now()
        var secs = parseInt((currTs - start) / 1000)
        var ms = (currTs - start) - secs * 1000
        ms = '000' + ms
        ms = ms.substring(ms.length - 2, ms.length)

        timer.innerText = `\n ${secs}:${ms}`
    }, 100)
}

//get a Random Color format #000000
function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

//using Keyboard Arrows, find the next position affected
//return it
function getNextLocation(eventKeyboard) {
    const nextPosition = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextPosition.i--
            break;
        case 'ArrowRight':
            nextPosition.j++
            break;
        case 'ArrowDown':
            nextPosition.i++
            break;
        case 'ArrowLeft':
            nextPosition.j--
            break;
    }
    return nextPosition
}

//////////////////////////////////////////////////////////////////////////////////////////






