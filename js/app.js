var board = [
    [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
    [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
    [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined]
]

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

  //Init Function
  var init = function () {
    var boardElement = document.getElementById('board')
    boardElement.innerHTML = generateBoard()
  }
  
  window.onload = init
