const apiKey = "c473d59f8d2390f4bf06767ec18fdb48";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="



const getApi = async (location) => {
    try {
        let response = await axios.get(apiUrl + location + "&appid=" + apiKey);
        return await response;
    }
    catch (err) {

    }
}
const search = async (input) => {
    let name = document.querySelector("#name");
    let temp = document.querySelector("#temp");
    let feels_like = document.querySelector("#feels_like");
    let humidity = document.querySelector("#humidity");
    let wind_speed = document.querySelector("#wind_speed");
    let description = document.querySelector("#description");

    try {
        let response = await getApi(input);
        if (name && temp && feels_like && humidity && wind_speed && description) {
            name.innerHTML = response.data.name;
            temp.innerHTML = "temp: " + Math.round(response.data.main.temp) + "&#8451";
            feels_like.innerHTML = "feels like: " + Math.round(response.data.main.feels_like) + "&#8451";
            humidity.innerHTML = "humidity " + response.data.main.humidity + "%";
            wind_speed.innerHTML = "wind speed: " + (Math.round(response.data.wind.speed * 1.6)) + " k/h";
            description.innerHTML = response.data.weather[0].description;
        }
    }
    catch (err) {
        name.innerHTML = "Invalid input";
    }

}

window.addEventListener("load", () => {
    let inputTxt = document.querySelector("#inputTxt");
    let inputBtn = document.querySelector("#inputBtn");
    if (inputTxt && inputBtn) {
        inputBtn.addEventListener("click", () => {
            search(inputTxt.value);
        });
    }
})