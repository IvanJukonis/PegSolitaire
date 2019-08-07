var sendEmail = function() {
    var name = document.getElementById('input-name').value
    var email = document.getElementById('input-email').value
    var message = document.getElementById('input-message').value
    window.location.href = 'mailto:ivanjukonis@hotmail.com?subject=Peg solitarie contact page - Sent by ' + name + '&body=' + message + '. Respond to: ' + email 
}

var returnIndex = function() {
    window.location = 'index.html'
}

var addFormButtonsEventHandlers = function (formBtn) {
    for (let i = 0; i < formBtn.length; i++) {
        formBtn[i].onclick = pressButtonForm
    }
}
  
var pressButtonForm = function (evt) {
    var id = evt.target.id
    if (id == 'return-index-btn') {
        returnIndex()  
    }
    else if (id == 'send-form-btn') {
        sendEmail()
    }
}

var init = function() {
    formBtn = document.getElementsByClassName('form-btn')
    addFormButtonsEventHandlers(formBtn)
}

window.onload = init
