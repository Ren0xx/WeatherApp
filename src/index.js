import "../src/style.scss";


async function getData(cityName) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=40e8ac432788c18ba02074a07c6815ab`, {mode: 'cors'});
    const data = await response.json();
    console.log(data);

    return data;
}

getData("Gostynin");













// VANTA.CLOUDS2({
//     el: "body",
//     mouseControls: true,
//     touchControls: true,
//     gyroControls: false,
//     minHeight: 200.00,
//     minWidth: 200.00,
//     scale: 1.00,
//     texturePath: "../src/noise.png",
//     speed: 0.70,
// })
