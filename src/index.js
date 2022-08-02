import "../src/style.scss";

const searchBtn = document.getElementById("searchBtn");
const searchForm = document.getElementById("searchForm");
let temperature = document.getElementById("temperature");

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
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=40e8ac432788c18ba02074a07c6815ab`,
            { mode: "cors" }
        );
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(error);
    }
}

function processData(data) {
    const clouds = data.clouds.all;
    const main = data.main;
    const wind = data.wind;
    const obj = {
        main: main,
        wind: wind,
        clouds: clouds,
    };

    return obj;
}

function returnWeatherData() {
    searchBtn.addEventListener("click", () => {
        const searchPhrase = searchForm.value.trim();
        if (searchPhrase.length === 0) {
            console.log('nope');
            return;
        }
        getData(searchPhrase)
            .then((data) => {
                console.log(processData(data));
                temperature.textContent = data.main.temp;
            })
            .catch((err) => {
                console.log(err);
            });
    });
}

returnWeatherData();
