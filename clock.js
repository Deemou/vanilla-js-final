const clockTitle = document.querySelector(".js-clock h1"),
    dateTitle = document.querySelector(".js-clock h3");

function getTime() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    dateTitle.innerText = `${day < 10 ? `0${day}` : day} / ${
        month < 10 ? `0${month}` : month} / ${year}`;
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds}`;
}
function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
