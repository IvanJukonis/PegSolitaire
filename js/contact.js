var sendEmail = function() {
    
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
    formBtn = document.getElementById('form-btn')
    addFormButtonsEventHandlers(formBtn)
}

window.onload = init
