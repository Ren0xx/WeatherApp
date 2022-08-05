import "../src/style.scss";
import noise from '../src/images/noise.png';
import heart from '../src/images/heart-regular.svg'
import face from '../src/images/face-frown-regular.svg'
import logo from '../src/images/logo.svg';

const searchedCityName = document.getElementById("searchedCity");
let temperature = document.getElementById("temperature");

const searchForm = document.getElementById("searchForm");
const searchBtn = document.getElementById("searchBtn");
const spinner = document.getElementById("loadSpinner");
const weatherIcon = document.getElementById("weatherIcon");
const weatherDesc = document.getElementById("weatherDesc");
const myLogo = document.querySelector(".myLogo");

const metric = document.getElementById("metric");
const units = ["metric", "imperial"];
let currentUnit = units[0];

weatherIcon.src = heart;
myLogo.src = logo;

async function getData(cityName) {
    try {
        currentUnit = metric.checked ? "metric" : "imperial";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=40e8ac432788c18ba02074a07c6815ab&units=${currentUnit}`,
            { mode: "cors" }
        );
        const data = await response.json();
        return data;
    } catch (err) {}
}
function getIcon(iconID) {
    return `https://openweathermap.org/img/wn/${iconID}@2x.png`;
}
function renderWeatherData() {
    searchBtn.addEventListener("click", () => {
        const searchPhrase = searchForm.value.trim();
        if (searchPhrase.length === 0) {
            return;
        }
        spinner.hidden = false;
        getData(searchPhrase)
            .then((data) => {
                weatherIcon.src = getIcon(data.weather[0].icon);
                searchedCityName.textContent = `${data.name}, ${data.sys.country}`;
                const currentSign = currentUnit === "metric" ? "°C" : "°F";
                temperature.textContent = `${Math.round(
                    data.main.temp
                )}${currentSign}`;

                weatherDesc.textContent = data.weather[0].description;
                spinner.hidden = true;
            })
            .catch(() => {
                spinner.hidden = true;
                temperature.textContent = "Something went wrong...";
                weatherIcon.src = face;
                weatherDesc.textContent = '';
                searchedCityName.textContent = '';
            });
    });
}

renderWeatherData();

VANTA.CLOUDS2({
    el: "body",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    texturePath: `${noise}`,
    speed: 0.7,
});
