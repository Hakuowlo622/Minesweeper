'use strict'

const EASY = { matSize: 4, mineTotal: 2 }//N x N -> 4x4=16 (2 mines)
const MEDIUM = { matSize: 8, mineTotal: 14 }//N x N -> 8x8=64 (14 mines)
const HARD = { matSize: 12, mineTotal: 32 }//N x N -> 12x12=144 (32 mines)

const BOMB = '💣'

var gBoard//mat
var gGame = {//{}
    location: {},
    gameMode: EASY
}



function onInit() {
    gBoard = createBoard()
    createBombs(gBoard)
    renderBoard(gBoard)

}

function createBoard() {
    var board = []
    for (var i = 0; i < gGame.gameMode.matSize > 0; i++) {
        board.push([])
        for (var j = 0; j < gGame.gameMode.matSize > 0; j++) {
            board[i][j] = ''
        }
    }
    console.table('board', board)
    return board
}

// Render the board to an HTML table
function renderBoard(board) {
    const elBoard = document.querySelector('.board')
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>\n'
        for (var j = 0; j < board[0].length; j++) {
            const currCell = board[i][j]

            console.log('currCell', currCell)
            var tdId = `cell-${i}-${j}`

            //set className!
            if (currCell === BOMB) var className = BOMB
            else var className = 'empty'


            strHTML += `\t<td id="${tdId}" data-i="${i}" data-j="${j}" class="cell ${className}" onclick="onCellClicked(this,${i},${j})" ${currCell}>\n`



            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    console.log(strHTML)
    elBoard.innerHTML = strHTML
}

//when cell clicked, either bomb appear.
function onCellClicked(location, rowIdx, colIdx) {
    // console.log('location', location)
    // console.log('rowIdx', rowIdx)
    // console.log('colIdx', colIdx)
    console.log('location.classList', location.classList)

    renderCell(location, location.classList)

}


// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    console.log('value.includes(BOMB)', value[0])

    const elCell = location
    console.log('value', value)
    console.log('location', location)
    console.log('elCell', elCell)
    elCell.innerHTML = value
}
