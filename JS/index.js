
// // https://api.weatherapi.com/v1/search.json?key=951bb29b64394d42a60114445241809&q=lond
// Define Data
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let city = document.querySelector("#city")
let rowData = document.querySelector("#rowData")
// // Fetch and display the 3-day weather forecast based on the selected city
async function search(cityName) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=951bb29b64394d42a60114445241809&q=${cityName}&days=3`);
    
    if (response.status == 200 && response.status !== 400) {
        let weatherData = await response.json();
        // func for this day whether
        displayCurrent(weatherData.location, weatherData.current);
        // func for the new 2 days whether
        displayAnother(weatherData.forecast.forecastday);
    }
    else{
        window.alert("There Is no Internet Connection")
    }
}

// Add event listener for search input to get cities
// while searching to find the matching city
city.addEventListener("keyup", async (e) => {
    let query = e.target.value;

    if (query.length >= 3) {
        let response = await fetch(`https://api.weatherapi.com/v1/search.json?key=951bb29b64394d42a60114445241809&q=${query}`);
        if (response.status == 200) {
            let cities = await response.json();
            // Display the first matched city from the search result
            if (cities.length > 0) {
                search(cities[0].name);
            }
        }
    }
});


// Display today's weather forecast
function displayCurrent(location, currentWeather) {
    if (currentWeather) {
        const lastUpdated = new Date(currentWeather.last_updated.replace(" ", "T"));
        let box = `
        <div class="col-md-4 my-3">
            <div class="todayWeather rounded-2">
                <div class="date py-3 d-flex justify-content-between px-3">
                    <div class="day">${days[lastUpdated.getDay()]}</div>
                    <div class="date">${lastUpdated.getDate()} ${monthNames[lastUpdated.getMonth()]}</div>
                </div>
                <div class="town mt-4 ps-3">${location.name}</div>
                <div class="degree ms-3 ps-3 d-flex align-items-center">
                    <div class="num">${currentWeather.temp_c}<sup>o</sup>C</div>
                    <div class="icon"><img src="https:${currentWeather.condition.icon}" class="d-block w-100" alt="Weather Icon"></div>
                </div>
                <div class="custom ps-3 mb-4">${currentWeather.condition.text}</div>
                <div class="info pb-4 ps-3">
                    <span><img src="./Images/icon-umberella.png" alt=""> ${currentWeather.humidity}%</span>
                    <span><img src="./Images/icon-wind.png" alt=""> ${currentWeather.wind_kph} km/h</span>
                    <span><img src="./Images/icon-compass.png" alt=""> ${currentWeather.wind_dir}</span>
                </div>
            </div>
        </div>`;
        rowData.innerHTML = box;
    }
}

// Display the weather forecast for the next two days
function displayAnother(forecastDays) {
    let box = '';
    for (let i = 1; i < forecastDays.length; i++) { // Skip the first day (current day)
        let forecastDate = new Date(forecastDays[i].date.replace(" ", "T"));
        box += `
        <div class="col-md-4 my-3">
            <div class="Weather text-center rounded-2">
                <div class="date py-3 text-center px-3">
                    <div class="day">${days[forecastDate.getDay()]}</div>
                </div>
                <div class="degree mt-4 ms-3 ps-3 d-flex flex-column align-items-center">
                    <div class="icon"><img src="https:${forecastDays[i].day.condition.icon}" alt="Weather Icon"></div>
                    <div class="num">${forecastDays[i].day.maxtemp_c}<sup>o</sup>C</div>
                    <small>${forecastDays[i].day.mintemp_c}<sup>o</sup>C</small>
                </div>
                <div class="custom ps-3 my-3">${forecastDays[i].day.condition.text}</div>
                <div class="info pb-4 ps-3">
                    <span><img src="./Images/icon-umberella.png" alt=""> ${forecastDays[i].day.daily_chance_of_rain}%</span>
                    <span><img src="./Images/icon-wind.png" alt=""> ${forecastDays[i].day.maxwind_kph} km/h</span>
                </div>
            </div>
        </div>`;
    }
    rowData.innerHTML += box;
}

// Initial search for Cairo
search("Cairo");



