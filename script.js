const apiKey = `${process.env.API_KEY}`;
const apiUrl = `${process.env.API_URL}`;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

let timeoutId;

// Add an event listener for the 'input' event
searchBox.addEventListener("input", () => {
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
        const city = searchBox.value.trim();
        if (city.length > 2) {
            checkWeather(city);
        } else {
            document.querySelector(".error").style.display = "none";
            document.querySelector(".weather").style.display = "none";
        }
    }, 700); // Wait for 500ms after the user stops typing
});

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

            switch(data.weather[0].main) {
                case "Clouds":
                    weatherIcon.src = "images/clouds.png";
                    document.querySelector(".card").style.backgroundImage = 'linear-gradient(135deg, #465b7d, #615d78)';
                    break;
                case "Clear":
                    weatherIcon.src = "images/clear.png";
                    document.querySelector(".card").style.backgroundImage = 'linear-gradient(135deg, #39aaf6, #eaf67d)';
                    break;
                case "Rain":
                    weatherIcon.src = "images/rain.png";
                    document.querySelector(".card").style.backgroundImage = 'linear-gradient(135deg, #717272, #6488bf)';
                    break;
                case "Drizzle":
                    weatherIcon.src = "images/drizzle.png";
                    break;
                case "Mist":
                    weatherIcon.src = "images/mist.png";
                    break;
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

// Keep the click event listener for the search button
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
