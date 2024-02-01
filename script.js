const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkweather(city) {
    try {
        const api_key = "53b659de9788c4f4aa74a25a7ac31931";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
        const response = await fetch(url);
        const weather_data = await response.json();

        console.log("Weather Data:", weather_data);

        if (weather_data.cod === '404') {
            location_not_found.style.display = 'flex';
            weather_body.style.display = 'none';
            console.log("Location not found!");
            return;
        }

        temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
        description.innerHTML = `${weather_data.weather[0].description}`;
        humidity.innerHTML = `${weather_data.main.humidity} %`;
        wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                weather_img.src = "cloud.png";
                break;
            case 'Clear':
                weather_img.src = "clear.png";
                break;
            case 'Rain':
                weather_img.src = "rain.png";
                break;
            case 'Mist':
                weather_img.src = "mist.png";
                break;
            case 'Snow':
                weather_img.src = "snow.png";
                break;
            default:
                break;
        }

        location_not_found.style.display = 'none';
        weather_body.style.display = 'flex';
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

searchBtn.addEventListener('click', () => {
    console.log("Button clicked!");
    checkweather(inputBox.value);
});
