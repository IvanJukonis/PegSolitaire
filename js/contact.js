
var returnIndex = function() {
    window.location = 'index.html'
}

var returnIndexAddEventHandler = function (returnBtn) {
    returnBtn.onclick = returnIndex
}


var init = function() {
    returnBtn = document.getElementById('return-index')
    returnIndexAddEventHandler(returnBtn)
}

window.onload = init
