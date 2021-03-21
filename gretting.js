const jsForm = document.querySelector(".js-form"),
    inputName = jsForm.querySelector("input[name='name']"),
    gretting = document.querySelector(".grettings");

const USER_LS = "currentUser",
    SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleNameSubmit(event) {
    event.preventDefault();
    const currentValue = inputName.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    gretting.classList.remove(SHOWING_CN);
    jsForm.classList.add(SHOWING_CN);
    jsForm.addEventListener("submit", handleNameSubmit);
}

function paintGreeting(text) {
    jsForm.classList.remove(SHOWING_CN);
    gretting.classList.add(SHOWING_CN);
    gretting.innerText = `Hello, ${text}! 
                        How are you today?`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null) {
        // she is not
        askForName();
    }
    else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();