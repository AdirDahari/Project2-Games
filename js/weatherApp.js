const apiKey = "c473d59f8d2390f4bf06767ec18fdb48";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="

// Sent request with axios to weather api
const getApi = async (location) => {
    try {
        let response = await axios.get(apiUrl + location + "&appid=" + apiKey);
        return await response;
    }
    catch (err) {

    }
}

// This function set the dom variables by the response from the api request. 
const search = async (input) => {
    let name = document.querySelector("#name");
    let temp = document.querySelector("#temp");
    let feels_like = document.querySelector("#feels_like");
    let humidity = document.querySelector("#humidity");
    let wind_speed = document.querySelector("#wind_speed");
    let description = document.querySelector("#description");
    let iconImg = document.querySelector("#iconImg");

    try {
        let { data } = await getApi(input);
        if (name && temp && feels_like && humidity && wind_speed && description) {
            iconImg.src = setIcons(data.weather[0].icon);
            name.innerHTML = data.name;
            temp.innerHTML = Math.round(data.main.temp) + "&#8451";
            feels_like.innerHTML = "feels like: " + Math.round(data.main.feels_like) + "&#8451";
            humidity.innerHTML = "humidity " + data.main.humidity + "%";
            wind_speed.innerHTML = "wind speed: " + (Math.round(data.wind.speed)) + " m/s";
            description.innerHTML = data.weather[0].description;
        }
    }
    catch (err) {
        if (name && temp && feels_like && humidity && wind_speed && description) {
            iconImg.src = "./img/InvalidIcon.png";
            name.innerHTML = "Invalid input";
            temp.innerHTML = "... " + "&#8451";
            feels_like.innerHTML = "feels like: "
            humidity.innerHTML = "humidity "
            wind_speed.innerHTML = "wind speed: "
            description.innerHTML = "No description"
        }
    }

}

// set the weather icon by the weather api icon
const setIcons = (weather) => {
    let weatherToReturn;
    const iconsDay = [
        "./img/01d.png",
        "./img/02d.png",
        "./img/03d.png",
        "./img/04d.png",
        "./img/09d.png",
        "./img/10d.png",
        "./img/11d.png",
        "./img/13d.png",
        "./img/50d.png",
    ];
    const iconsNight = [
        "./img/01n.png",
        "./img/02n.png",
        "./img/03d.png",
        "./img/04n.png",
        "./img/09n.png",
        "./img/10d.png",
        "./img/11d.png",
        "./img/13d.png",
        "./img/50n.png",
    ];
    switch (weather) {
        case "01d":   // Day
            weatherToReturn = iconsDay[0];
            break;
        case "02d":
            weatherToReturn = iconsDay[1];
            break;
        case "03d":
            weatherToReturn = iconsDay[2];
            break;
        case "04d":
            weatherToReturn = iconsDay[3];
            break;
        case "09d":
            weatherToReturn = iconsDay[4];
            break;
        case "10d":
            weatherToReturn = iconsDay[5];
            break;
        case "11d":
            weatherToReturn = iconsDay[6];
            break;
        case "13d":
            weatherToReturn = iconsDay[7];
            break
        case "50d":
            weatherToReturn = iconsDay[8];
            break;
        case "01n":    // Night
            weatherToReturn = iconsNight[0];
            break;
        case "02n":
            weatherToReturn = iconsNight[1];
            break;
        case "03n":
            weatherToReturn = iconsNight[2];
            break;
        case "04n":
            weatherToReturn = iconsNight[3];
            break;
        case "09n":
            weatherToReturn = iconsNight[4];
            break;
        case "10n":
            weatherToReturn = iconsNight[5];
            break;
        case "11n":
            weatherToReturn = iconsNight[6];
            break;
        case "13n":
            weatherToReturn = iconsNight[7];
            break
        case "50n":
            weatherToReturn = iconsNight[8];
            break;
    }
    return weatherToReturn;
}

window.addEventListener("load", () => {
    let inputTxt = document.querySelector("#inputTxt");
    let inputBtn = document.querySelector("#inputBtn");
    search("tel aviv");
    inputTxt.value = "";
    if (inputTxt && inputBtn) {
        inputBtn.addEventListener("click", () => {
            search(inputTxt.value);
        });
    }
})