const leftside = document.querySelector(".left-side");
const menu = leftside.querySelector("button[name='menu']");
const sidebar = document.querySelector(".sidebar");
const nameBtn = document.querySelector(".sidebar__list li[name='user_name']");
const toggleBackground = document.querySelector(".sidebar__list li[name='background']");
const sidebar__btn__bg = document.querySelector(".sidebar__btn--bg");
const toggleWebsite = document.querySelector(".sidebar__list li[name='website']");
const sidebar__btn__web = document.querySelector(".sidebar__btn--web");

let menuCounter = 0;

function handleMenuClick() {
    sidebar.classList.toggle("show-sidebar")
    sidebar__btn__bg.classList.remove("show-sidebar__btn");
    sidebar__btn__web.classList.remove("show-sidebar__btn--web");
    leftside.classList.add("fix-menu");

    menuCounter++;
    if(menuCounter % 2 == 0) {
        menu.innerHTML = `Menu <i class="fas fa-chevron-circle-right fa-lg"></i>`;
    } else {
        menu.innerHTML = `Menu <i class="fas fa-chevron-circle-down fa-lg"></i>`;
    }
}

function changeName() {
    localStorage.removeItem(USER_LS);
    askForName();
}

function handleBgBtnClick() {
    sidebar__btn__bg.classList.toggle("show-sidebar__btn");
}

function selectBackground(event) {
    const btn = event.target;
    const value = parseInt(btn.name);

    if(value) {
        image.src = `images/${value}.jpg`;
    }

}

function handleWebBtnClick() {
    sidebar__btn__web.classList.toggle("show-sidebar__btn--web");
}

function init() {
    menu.addEventListener("click", handleMenuClick);
    nameBtn.addEventListener("click", changeName);
    toggleBackground.addEventListener("click", handleBgBtnClick);
    sidebar__btn__bg.addEventListener("click", selectBackground);
    toggleWebsite.addEventListener("click", handleWebBtnClick);
}

init();