
var returtnea = function() {
    window.location = 'index.html'
}

var volverAddEventHandler = function (volver) {
    volver.onclick = returtnea
}

var init = function(){
volver = document.getElementById('volve')
volverAddEventHandler(volver)
}

window.onload = init
