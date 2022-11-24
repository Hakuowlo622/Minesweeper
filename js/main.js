'use strict'

const EASY = { matSize: 4, mineTotal: 2 }//N x N -> 4x4=16 (2 mines)
const MEDIUM = { matSize: 8, mineTotal: 14 }//N x N -> 8x8=64 (14 mines)
const HARD = { matSize: 12, mineTotal: 32 }//N x N -> 12x12=144 (32 mines)

const BOMB = '💣'
const FLAG = '🚩'
const EMPTY = 'empty'

var gBoard//mat
var gGame = {//{}
    location: {},
    gameMode: EASY,
    isGameOn: true
}



function onInit(difficulty) {
    if (difficulty === 'EASY') gGame.gameMode = EASY
    if (difficulty === 'MEDIUM') gGame.gameMode = MEDIUM
    if (difficulty === 'HARD') gGame.gameMode = HARD
    gBoard = createBoard()
    createBombs(gBoard)
    renderBombs(gBoard)
    console.log('gGame.gameMode', gGame.gameMode)
    renderBoard(gBoard)
    gGame.isGameOn = true

}


function endgame() {
    gGame.isGameOn = false
    //clear intervals
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

            // console.log('currCell', currCell)
            var tdId = `cell-${i}-${j}`

            //set className!
            if (currCell === BOMB) var className = BOMB
            else var className = EMPTY


            strHTML += `\t<td id="${tdId}" data-i="${i}" data-j="${j}" class="cell ${className}" onmousedown="onCellClicked(event,this)" ${currCell}>\n`


            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    // console.log(strHTML)
    elBoard.innerHTML = strHTML
}




//when cell clicked....
function onCellClicked(event, location) {
    // console.log('location', location)
    // console.log('event.button', event.button)//0=right click, 1=middle click, 2=left click
    // console.log('location.classList', location.classList)

    //TODO: clicked bomb cell
    /*You Lose!*/if (event.button === 0) {
        if (location.classList[1] === BOMB) {
            renderCell(location, location.classList[1])
            endgame()

        }
    }

    //DONE: clicked empty cell
    /*runs find neighbor function and if no neighbor bombs, change cell style(??),*/
    /*if yes neighbor bombs, at each cell leave number corresponding to number of neighbor bombs */
    if (event.button === 0) {
        if (location.classList[1] === EMPTY) {
            var nigs = countNeighbors(location.dataset, gBoard, BOMB)
            location.innerText = nigs
            console.log('nigs', nigs)
        }

    }


    //TODO: click right mouse button
    //onmousedown="WhichButton(event,this)"?
    //0=right click, 1=middle click, 2=left click
    // if(location.classList[1]===BOMB&&event.button===2) { location.classList[1]===FLAG  /*remove from gBomb, if gBomb array of objects, gets empty, you win!*/}
    if (event.button === 2) location.classList.add(FLAG)





    // renderCell(location, location.classList)

}




//NEED CHECKING AT A LATER POINT, IF NEED TO FIX THIS FUNCTION!
// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    console.log('value[0]', value[0])
    console.log('value[1]', value[1])

    const elCell = location
    // console.log('value', value)
    // console.log('location', location)
    // console.log('elCell', elCell)
    elCell.innerHTML = value
}
