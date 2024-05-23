// app.js
document.addEventListener("DOMContentLoaded", function() {
    const API_KEY = 'fad4142cd10b3e15f0318a1def9e015f';
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    function fetchWeatherData(city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const { coord } = data;
                document.getElementById('location').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
                fetchForecastData(coord.lat, coord.lon);
                map.setView([coord.lat, coord.lon], 10);
                L.marker([coord.lat, coord.lon]).addTo(map);

                document.getElementById('weather-info').classList.remove('hidden');
                document.getElementById('footer').classList.remove('hidden');
            })
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function fetchForecastData(lat, lon) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
            .then(response => response.json())
            .then(data => {
                const forecastList = document.getElementById('forecast-list');
                forecastList.innerHTML = ''; // Clear previous forecast
                data.list.forEach((item, index) => {
                    if (index % 8 === 0) { // Get data for every 24 hours (8*3h=24h)
                        const forecastItem = document.createElement('div');
                        forecastItem.className = 'forecast-item';
                        forecastItem.innerHTML = `
                            <p>Date: ${new Date(item.dt * 1000).toLocaleDateString()}</p>
                            <p>Temp: ${item.main.temp}°C</p>
                            <p>Weather: ${item.weather[0].description}</p>
                        `;
                        forecastList.appendChild(forecastItem);
                    }
                });
            })
            .catch(error => console.error('Error fetching forecast data:', error));
    }

    document.getElementById('city-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const city = document.getElementById('city-input').value;
        fetchWeatherData(city);
    });
});
