// Select necessary HTML elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const searchInput = document.querySelector('.search-box input');
// Select the image element for invalid location
const invalidLocationImage = document.querySelector('.not-found img');
// Set the default city name
let defaultCity = 'Peshawar';

document.addEventListener('DOMContentLoaded', () => {
  // Set the initial value of the search input to the default city
  searchInput.value = defaultCity;

  // Fetch and display weather information for the default city (Peshawar)
  fetchWeather(defaultCity);
});

search.addEventListener('click', () => {
    // Get the entered city from the user
    const city = searchInput.value.trim(); // Get the value from the input field

    if (city === '')
        return;

    // Fetch and display weather information for the entered city
    fetchWeather(city);
});
// Function to fetch and display weather information for a given city
function fetchWeather(city) {
    const APIKey = '57359984bfcf2e9200834de6922951f3';
  // Fetch weather data from the OpenWeather API using the provided city and API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
          // Handle the case where the API response indicates an invalid location (404)
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                invalidLocationImage.src = '404.png'; // Replace with your image path
                return;
            }
             // Hide the error message and reset its animation
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');
             // Select HTML elements to display weather information
            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
            // Set the weather image based on the weather condition
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear-day.svg';
                    break;

                case 'Rain':
                    image.src = 'extreme-haze.svg';
                    break;

                case 'Snow':
                    image.src = 'extreme-snow.svg';
                    break;

                case 'Clouds':
                    image.src = 'clouds.svg';
                    break;

                case 'Haze':
                    image.src = 'extreme-haze.svg';
                    break;

                case 'Fog':
                    image.src = 'overcast-day-smoke.svg'; // Add this case for Fog
                    break;

                case 'Thunderstorm':
                      image.src = 'thunderstorms-extreme-rain.svg'; // Add this case for Thunderstorm
                      break;
              
                case 'Dust':
                      image.src = 'dust-wind.svg'; // Add this case for Dust
                      break;
              
                case 'Hot':
                      image.src = 'Hot.svg'; // Add this case for Hot
                      break;
                default:
                    image.src = '';
            }
            // Display temperature, weather description, humidity, and wind speed
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            // Display the weather information boxes and adjust container height
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

            // Clear the input field's value after fetching weather data
            searchInput.value = '';
        });
}
