var board = [
  [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
  [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
  [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
  [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
  [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
  [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
  [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined]
]

var resetBoard = function (){
  board = [
    [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
    [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 0 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
    [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined],
    [undefined, undefined, { value: 1 }, { value: 1 }, { value: 1 }, undefined, undefined]
  ]
}

var loadBoard = function(){
  board = JSON.parse(localStorage['board'])
}

//#region Generate Board

//Returns string with row number and column number (used to make id)
var createId = function (rowN, colN) {
  return 'ball-' + rowN + '-' + colN
}

//Create buttons inside a row with id and a class
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

//#region Ball selection and suggestions

var selectedBall = { x: undefined, y: undefined }
var suggestions = []

//Gives all balls the funciton selectBall (on click)
var addBallsEventHandlers = function (Balls) {
  for (let i = 0; i < Balls.length; i++) {
    Balls[i].onclick = selectBall
  }
}

//Return x and y positions
var getPositionFromId = function(id) {
  var idParts = id && id.length ? id.split('-') : [] 
  if (idParts.length === 3) {
    return {
      x: parseInt(idParts[1]),
      y: parseInt(idParts[2])
    }
  }
  return {}
}

//Change class "ballSelected" to class "ball" from a selectedBall
var unselectBall = function () {
  if (selectedBall.x !== undefined && selectedBall.y !== undefined) {
    var prevSelectedId = createId(selectedBall.x, selectedBall.y)
    document.getElementById(prevSelectedId).className = 'ball'
    //change class suggestion to empty
    var suggestions = document.getElementsByClassName('suggestions')
    for (let i = 0; i < suggestions.length; i++) {
      suggestions[i].className = 'empty'
    }
  }
}

//Returns inner html from element (need id)
var getElement = function (id) {
  var element = document.getElementById(id)
  return element || {}
}

//executed on selectBall
var showSuggestions = function () {
  var near = {
    //vars will contain inner html from buttons near
    above: getElement(createId(selectedBall.x - 1, selectedBall.y)),
    left: getElement(createId(selectedBall.x, selectedBall.y - 1)),
    right: getElement(createId(selectedBall.x, selectedBall.y + 1)),
    below: getElement(createId(selectedBall.x + 1, selectedBall.y))
  }
  var possible = {
    //vars will contain inner html from buttos next to near
    above: getElement(createId(selectedBall.x - 2, selectedBall.y)),
    left: getElement(createId(selectedBall.x, selectedBall.y - 2)),
    right: getElement(createId(selectedBall.x, selectedBall.y + 2)),
    below: getElement(createId(selectedBall.x + 2, selectedBall.y))
  }
  //change class empty from var possible to suggestions and fill in the array suggestion
  if (near.above.className === 'ball' && possible.above.className === 'empty') {
    possible.above.className = 'suggestions'
    suggestions.push(possible.above.id) /* save suggestions id into array*/
  }
  if (near.left.className === 'ball' && possible.left.className === 'empty') {
    possible.left.className = 'suggestions'
    suggestions.push(possible.left.id)
  }
  if (near.right.className === 'ball' && possible.right.className === 'empty') {
    possible.right.className = 'suggestions'
    suggestions.push(possible.right.id)
  }
  if (near.below.className === 'ball' && possible.below.className === 'empty') {
    possible.below.className = 'suggestions'
    suggestions.push(possible.below.id)
  }
}

var selectBall = function (evt) {
  suggestions = []
  //Get the ball clicked
  var Ball = evt.target
  //Obtain x and y positions from the ID
  var pos = getPositionFromId(Ball.id)
  if (pos.x !== undefined && pos.y !== undefined) {
    //In case of having a ball selected
    unselectBall()
    //In case of clicking the same ball twice
    if (selectedBall.x === parseInt(pos.x) && selectedBall.y === parseInt(pos.y)) {
      unselectBall()
      selectedBall.x = undefined
      selectedBall.y = undefined
    }
    //Changes values from array selectedBall and  ball class
    else {
      selectedBall.x = parseInt(pos.x)
      selectedBall.y = parseInt(pos.y)
      Ball.className = 'ballSelected'
      showSuggestions()
    }
  }
}

//#endregion

//#region Win or lose popup

var allSuggestions = []

//Reload Page
var refreshPage = function(){
  location.reload()
}

//Open popup score
/*var openPopupScore = function() {
  
}*/

//Buttons Handlers
var addButtonPopupResetEventHandlers = function (popupReset) {
  for (let i = 0; i < popupReset.length; i++) {
    popupReset[i].onclick = refreshPage
  }
}

/*var addButtonPopupSaveEventHandlers = function (popupSave) {
  for (let i = 0; i < popupSave.length; i++) {
    popupSave[i].onclick = openForm
  }
}*/

//Check Result
var getNearBall = function(x, y){
  var near = {
    above: getElement(createId(x - 1, y)),
    left: getElement(createId(x, y - 1)),
    right: getElement(createId(x, y + 1)),
    below: getElement(createId(x + 1, y))
  }
  return near 
}

var getPossibleBall = function(x, y){
  var possible = {
    above: getElement(createId(x - 2, y)),
    left: getElement(createId(x, y - 2)),
    right: getElement(createId(x, y + 2)),
    below: getElement(createId(x + 2, y))
  }
  return possible 
}

var checkResult = function () {
  var balls = document.getElementsByClassName('ball')
  allSuggestions = []
  for (i = 0; i < balls.length; i++) {
    var pos = getPositionFromId(balls[i].id)
    if (pos.x !== undefined && pos.y !== undefined) {
      var near = getNearBall(pos.x, pos.y)
      var possible = getPossibleBall(pos.x, pos.y)
      if (near.above.className === 'ball' && possible.above.className === 'empty') {
        allSuggestions.push(possible.above.id)
      }
      if (near.left.className === 'ball' && possible.left.className === 'empty') {
        allSuggestions.push(possible.left.id)
      }
      if (near.right.className === 'ball' && possible.right.className === 'empty') {
        allSuggestions.push(possible.right.id)
      }
      if (near.below.className === 'ball' && possible.below.className === 'empty') {
        allSuggestions.push(possible.below.id)
      }
    }
  }
  if(allSuggestions.length === 0){
    return true;
  }
  else{
    return false;
  }
}

var popupScore = function(currentPoints){ 
  finalScore = document.getElementsByClassName('popup-final-score') 
  for (let i = 0; i < finalScore.length; i++) {;
    finalScore[i].innerHTML = '<h1> Your final score is: ' + currentPoints + ' !Great Job!</h1>'
  }
}

var overlayAction = function() {
  overlay = document.getElementById('overlay')
  if (overlay.className === 'overlay-disabled') {
    overlay.className = 'overlay-enabled'
  }
  else {
    overlay.className = 'overlay-disabled'
  }
}

var showPopup = function(result, currentPoints) {
  var popup = document.getElementById(result);
    if (popup.className === 'popup-hide') {
      popup.className = 'popup-show';
      popupScore(currentPoints)
      overlayAction()
    }
    else {
      popup.className = 'popup-hide';
      popupScore(currentPoints)
      overlayAction()
    }
}

//#endregion

//#region Ball movement and points

var currentPoints = 0
var pointsPerMovemment = 10

var changePoints = function(){ 
  return '<h1>' + currentPoints + '</h1>'
}

var moveBall = function(evt) {
  var id = evt.target.id
  var pos = getPositionFromId(id)
  if(pos.x !== undefined && pos.y !== undefined){
    if(suggestions.includes(id)) /*if element is on array return true (include)*/{
      //ball selected
      var oldRow = selectedBall.x
      var oldCol= selectedBall.y
     //ball suggested
      var newRow = pos.x
      var newCol = pos.y
      //middle ball
      var midRow = oldRow + ((newRow - oldRow) / 2)
      var midCol = oldCol + ((newCol - oldCol) / 2)
      //changes array values
      board[oldRow][oldCol] = {value: 0}
      board[midRow][midCol] = {value: 0}
      board[newRow][newCol] = {value: 1}
      //points
      currentPoints = currentPoints + pointsPerMovemment
      //reset
      selectedBall = { x:undefined, y: undefined}
      suggestions = []
      init()
    }
    //Check if player won or lost
    if (checkResult())
    {
      if (currentPoints == 310){
        result = 'popup-win'
        showPopup(result, currentPoints)
      }
      else{
        result = 'popup-lose'
        showPopup(result, currentPoints)
      }
    }
  }
}

var addEmptyEventHandlers = function (empty) {
  for (let i = 0; i < empty.length; i++) {
    empty[i].onclick = moveBall
  }
}

//#endregion

//#region Menu buttons

var addButtonsEventHandlers = function (buttons) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = pressButton;
  }
}

var pressButton = function (evt){
  var id = evt.target.id
  //RESET BTN
  if (id == 'menu-reset-btn') {
    resetBoard()
    selectedBall = { x:undefined, y: undefined}
    suggestions = []
    currentPoints = 0
    init()  
  }
  //SAVE BTN
  else if (id == 'menu-save-btn'){
    //Save board
    var JSONreadyBoard = JSON.stringify(board);
    localStorage.setItem('board', JSONreadyBoard);
    console.log(JSON.parse(localStorage['board']))
    //Save points
    var JsoncurrentPoints = JSON.stringify(currentPoints);
    localStorage.setItem('currentPoints', JsoncurrentPoints);
    console.log(JSON.parse(localStorage['currentPoints']))
  }
  //LOAD BTN
  else if (id == 'menu-load-btn'){
    if (JSON.parse(localStorage['board'])) {
    loadBoard(board)
    currentPoints = JSON.parse(localStorage['currentPoints'])
    selectedBall = { x:undefined, y: undefined}
    suggestions = []
    init()
    }
  }
}

//#endregion


//FORM

//Init Function
var init = function () {
  var boardElement = document.getElementById('board')
  boardElement.innerHTML = generateBoard()
  var Balls = boardElement.getElementsByClassName('ball')
  addBallsEventHandlers(Balls)
  var empty = boardElement.getElementsByClassName('empty')
  addEmptyEventHandlers(empty)
  var buttons = document.getElementsByClassName('menu-btn')
  addButtonsEventHandlers(buttons)
  var finalScore = document.getElementById('points')
  finalScore.innerHTML = changePoints()
  var popupReset = document.getElementsByClassName('popup-reset-btn')
  addButtonPopupResetEventHandlers(popupReset)
  /*var popupSave = document.getElementsByClassName('popup-save-btn')
  addButtonPopupSaveEventHandlers(popupSave)*/
}
window.onload = init
