'use strict'

// Returns the class name for a specific cell
function getClassName(location) {
    const cellClass = 'cell-' + location.i + '-' + location.j
    return cellClass
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



function countNeighbors(location, board, neighbor) {
    var countNigs = 0
    for (var i = location.i - 1; i <= location.i + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = location.j - 1; j <= location.j + 1; j++) {
            if (i === location.i && j === location.j) continue
            if (j < 0 || j >= board[0].length) continue
            // if (/*The Nig is being checked here*/) countNigs++
        }
    }
    return countNigs
}


function createBoard() {
    var board = []
    for (var i = 0; i < 8; i++) {
      board.push([])
      for (var j = 0; j < 8; j++) {
        board[i][j] = (Math.random() > 0.5) ? 'LIFE' : ''
      }
    }
    return board
}


//creates empty const matrix/Board with Row x Col Dimensions
function createEmptyBoard(ROWS, COLS) {
    const mat = []
    for (var i = 0; i < ROWS; i++) {
        const row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

// Render the board to an HTML table
function renderBoard(board) {
    const elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]
            var tdId = `cell-${i}-${j}`

            //set className!
            var className


            strHTML += `\t<td id="${tdId}" class="cell ${className}" onclick="onCellClicked(this,${i},${j})" ${currCell}>\n`



            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }

    elBoard.innerHTML = strHTML
}


// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    const cellSelector = '.' + getClassName(location) // cell-i-j
    const elCell = document.querySelector(cellSelector)
    elCell.innerHTML = value

    /*May Also:*/
    // const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    // elCell.innerHTML = value
}


//takes random number in array numbers, removes it from the array, returns the chosen num
function drawNum(nums) {
    var idx = gRandomIntInclusive(0, nums.length - 1)
    var num = nums[idx]
    nums.splice(idx, 1)
    return num
}


//return num between min max, including both
function gRandomIntInclusive(min, max) {
    max = Math.floor(max)
    min = Math.ceil(min)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

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

//get empty cells from board
function gEmptyCells(board) {
    var posArr = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            //  if (/*input condition*/) posArr.push({i,j})
        }
    }
    return posArr
}



function getNextLocation(eventKeyboard) {
    // console.log(eventKeyboard)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // DONE: figure out nextLocation
    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break;
        case 'ArrowRight':
            nextLocation.j++
            break;
        case 'ArrowDown':
            nextLocation.i++
            break;
        case 'ArrowLeft':
            nextLocation.j--
            break;
    }
    return nextLocation
}



function timer(){
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


