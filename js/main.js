'use strict'

const EASY = { matSize: 4, mineTotal: 2 }//N x N -> 4x4=16 (2 mines)
const MEDIUM = { matSize: 8, mineTotal: 14 }//N x N -> 8x8=64 (14 mines)
const HARD = { matSize: 12, mineTotal: 32 }//N x N -> 12x12=144 (32 mines)

const BOMB = '💣'
const FLAG = '🚩'
const START = '😀'
const LOSE = '😥'
const WIN = '😎'
const EMPTY = 'empty'

var gBoard//mat
var gGame = {//{}
    location: {},
    gameMode: EASY,
    isGameOn: true,
}
var gFlagsMetBombs = 0

var gTimerInterval


function onInit() {
    gGame.isGameOn = true

    var elResult = document.querySelector('.result')
    elResult.innerText = '\n'
    var elStartEmoji = document.querySelector('.restart')
    elStartEmoji.innerText = START

    clearInterval(gTimerInterval)

    gBoard = createBoard()
    createBombs(gBoard)
    renderBombs(gBoard)
    renderBoard(gBoard)

    timer()
}


function endGame(str) {
    gGame.isGameOn = false
    //clear intervals
    clearInterval(gTimerInterval)

    var elResult = document.querySelector('.result')
    elResult.innerText = str
    var elStartEmoji = document.querySelector('.restart')

    if (str === 'You Lose') elStartEmoji.innerText = LOSE
    else elStartEmoji.innerText = WIN
}

function difficultySet(difficulty) {
    if (difficulty === 'EASY') gGame.gameMode = EASY
    if (difficulty === 'MEDIUM') gGame.gameMode = MEDIUM
    if (difficulty === 'HARD') gGame.gameMode = HARD
    onInit()
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
            var tdId = `cell-${i}-${j}`

            //set className!
            if (currCell === BOMB) var className = BOMB
            else var className = EMPTY


            strHTML += `\t<td id="${tdId}" data-clicked="false" class="cell ${className}" onmousedown="onCellClicked(event,this)" ${currCell}>\n`


            strHTML += '\t</td>\n'
        }
        strHTML += '</tr>\n'
    }
    // console.log(strHTML)
    elBoard.innerHTML = strHTML
}


function cellZeroNigsCheck(event, idxI, idxJ) {
    // console.log('location', location)

    for (var i = idxI - 1; i < idxI + 2; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = idxJ - 1; j < idxJ + 2; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            else if (i === idxI && j === idxJ) continue
            else {
                var cell = getCellLocationById(i, j)
                if (cell.classList[1] !== BOMB && cell.dataset.clicked === 'false') {
                    onCellClicked(event, cell)
                }
            }
        }
    }
}




//when cell clicked....
function onCellClicked(event, location) {
    // console.log('location', location)
    // console.log('event.button', event.button)//0=right click, 1=middle click, 2=left click
    // console.log('location.classList', location.classList)
    if (gGame.isGameOn === false) { }
    else {

        //DONE: clicked bomb cell
        /*You Lose!*/
        if (event.button === 0) {
            if (location.classList[1] === BOMB) {
                renderCell(location, location.classList[1])
                endGame('You Lose')
            }

            //DONE: clicked empty cell
            /*runs find neighbor function and if no neighbor bombs, change cell style(??),*/
            /*if yes neighbor bombs, at each cell leave number corresponding to number of neighbor bombs */
            else if (location.classList[1] === EMPTY) {
                var posIdArray = location.id.split('-')
                var idxI = parseInt(posIdArray[1])
                var idxJ = parseInt(posIdArray[2])
                // console.log('idxI, idxJ', idxI, idxJ)

                var nigs = countNeighbors({ i: idxI, j: idxJ }, gBoard, BOMB)//{i:i,j:j}
                location.innerText = nigs
                location.style.backgroundColor = 'lightGrey'
                location.dataset.clicked = 'true'
                console.log('nigs', nigs)

                if (nigs === 0) cellZeroNigsCheck(event, idxI, idxJ)
                if (gCountClicked(gBoard) + gGame.gameMode.mineTotal === gGame.gameMode.matSize ** 2)  endGame('You Win')         
            }

        }

        //DONE: click right mouse button
        //onmousedown="WhichButton(event,this)"?
        //0=right click, 1=middle click, 2=left click
        if (event.button === 2 && location.dataset.clicked === 'false') {
            if (location.classList[2] === FLAG) {
                if (location.classList[1] === BOMB) gFlagsMetBombs--
                location.classList.remove(FLAG)
                renderCell(location, '')
            }
            else if (location.classList[1] === BOMB) {
                gFlagsMetBombs++
                location.classList.add(FLAG)
                renderCell(location, location.classList[2])
                if (gFlagsMetBombs === gGame.gameMode.mineTotal) endGame('You Win')
            }
            else {
                location.classList.add(FLAG)
                renderCell(location, location.classList[2])
            }

        }
    }
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
    const elCell = location
    elCell.innerHTML = value
}

