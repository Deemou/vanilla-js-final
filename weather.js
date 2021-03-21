const weather = document.querySelector(".js-weather");

const API_KEY = "f1c8d25cfaadf5514ba73041401a30bd";
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const weather_description = json.weather[0].description;
        const place = json.name;
        weather.innerText = `You are in ${place}!
                            ${temperature}℃ 
                            ${weather_description}!`;
    });
}

/*
참고: https://www.daleseo.com/js-async-promise/

async function getWeather(lat, lng) {
const postResponse = await fetch(
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
);
const post = await postResponse.json();
const temperature = post.main.temp;
const place = post.name;
weather.innerText = `${temperature} @ ${place}`;
}
*/

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}
function handleGeoError() {
    console.log("Can't access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();