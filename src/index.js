import "../src/style.scss";

const searchBtn = document.getElementById("searchBtn");
const searchForm = document.getElementById("searchForm");
const spinner = document.getElementById("loadSpinner");
let temperature = document.getElementById("temperature");

const metric = document.getElementById("metric");
const imperial = document.getElementById("imperial");

const units = ['metric', 'imperial'];
let currentUnit = units[0];

// VANTA.CLOUDS2({
//     el: "body",
//     mouseControls: true,
//     touchControls: true,
//     gyroControls: false,
//     minHeight: 200.00,
//     minWidth: 200.00,
//     scale: 1.00,
//     texturePath: "../src/images/noise.png",
//     speed: 0.70,
// })

async function getData(cityName) {
    try {
        currentUnit = (metric.checked) ? "metric" : "imperial";
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=40e8ac432788c18ba02074a07c6815ab&units=${currentUnit}`,
            { mode: "cors" }
        );
        const data = await response.json();
        return data;
    } catch (err) {
    }
}

function processData(data) {
    const main = data.main;
    const weather = data.weather;
    const obj = {
        main: main,
        weather: weather,
    };

    return obj;
}

function returnWeatherData() {
    searchBtn.addEventListener("click", () => {
        const searchPhrase = searchForm.value.trim();
        if (searchPhrase.length === 0) {
            return;
        }
        spinner.hidden = false;
        getData(searchPhrase)
            .then((data) => {
                console.log(processData(data));
                spinner.hidden = true;
                temperature.textContent = data.main.temp;
            })
            .catch(() => {
                spinner.hidden = true;
                temperature.textContent = "Something went wrong...";
            });
    });
}

returnWeatherData();
