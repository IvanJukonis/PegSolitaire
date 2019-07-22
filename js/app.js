var board = [
  [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
  [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
  [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
  [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
  [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
  [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
  [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined]
]

//#region Generate Board

//Returns string with row number and column number (used to make id)
var createId = function (rowN, colN) {
  return 'ball-' + rowN + '-' + colN
}

//Create buttons inside a row with an id and a class
var generateCell = function (cell, rowN, colN) {
  var html = '<button id="' + createId(rowN, colN) + '" class="'
  if (cell && cell.value) {
    html += 'ball'
  }
  else if (cell && cell.value == 0) {
    html += 'empty'
  }
  else {
    html += 'hidden'
  }
  html += '"></button>'
  return html
}

  //Creates label "row" and generates cells dependig on his lenght (board[i] lenght)
var generateRow = function (row, rowN) {
  var html = '<div class="row">'
  for (let j = 0; j < row.length; j++) {
    html += generateCell(row[j], rowN, j)
  }
  html += '</div>'
  return html
}
  
  //Creates label "game" and executes "generateRow" depending on board lenght (0-6)
var generateBoard = function () {
  var html = '<div class="game">'
  for (i = 0; i < board.length; i++) {
    html += generateRow(board[i], i)
  }
  html += '</div>'
  return html
}

//#endregion

//#region Ball Selection

var selectedBall = { x: undefined, y: undefined }

//Gives all balls the funciton selectBall (on click)
var addBallsEventHandlers = function (Balls) {
  for (let i = 0; i < Balls.length; i++) {
    Balls[i].onclick = selectBall
  }
}

//Change class "ballSelected" to class "ball" from a selectedBall
var unselectBall = function () {
  if (selectedBall.x !== undefined && selectedBall.y !== undefined) {
    var prevSelectedId = createId(selectedBall.x, selectedBall.y)
    document.getElementById(prevSelectedId).className = 'ball'
  }
}

var selectBall = function (evt) {
  //Get the ball clicked
  var Ball = evt.target
  //Obtain x and y positions from the ID
  var idParts = Ball.id && Ball.id.length ? Ball.id.split('-') : []
  if (idParts.length === 3) {
    //In case of having a ball selected
    unselectBall()
    //In case of clicking the same ball twice
    if (selectedBall.x === parseInt(idParts[1]) && selectedBall.y === parseInt(idParts[2])) {
      unselectBall()
      selectedBall.x = undefined
      selectedBall.y = undefined
    }
    //Changes values from array selectedBall and  ball class
    else {
      selectedBall.x = parseInt(idParts[1])
      selectedBall.y = parseInt(idParts[2])
      Ball.className = 'ballSelected'
    }
  }
}

//#endregion

//Init Function
var init = function () {
  var boardElement = document.getElementById('board')
  boardElement.innerHTML = generateBoard()
  var Balls = boardElement.getElementsByClassName('ball')
  addBallsEventHandlers(Balls)
}
  
window.onload = init
