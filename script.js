const xhr = new XMLHttpRequest()
const data = null
const btn = document.querySelector('#submit-btn');
const out = document.querySelector('#data')
wicon = document.querySelector('.weatherimg img');

btn.addEventListener('click', (e) => {
    e.preventDefault()
    const srh = document.querySelector('#search').value
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${srh}&appid=ef365952c9e2d1f26b6b13bc37e188df&units=metric`
    document.querySelector('.app-main').style.display ="block";
    //
    if (srh == '') {
        alert('Please enter city name or location to know the weather details');
        document.querySelector('.app-main').style.display ="none";
    }
    else {
        console.log(url)
    }

    xhr.open('GET', url)

    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

    // https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=ef365952c9e2d1f26b6b13bc37e188df

    xhr.onreadystatechange = () => {
        if (xhr.status === 200 && xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText)
            console.log(response)


            let city = document.getElementById('city');
            city.innerText = `${response.name}, ${response.sys.country}`;

            let temperature = document.getElementById('temp');
            temperature.innerHTML = `Feels like ${Math.round(response.main.temp)}&deg;C`;

            let minMaxTemp = document.getElementById('min-max');
            minMaxTemp.innerHTML = `${Math.floor(response.main.temp_min)}&deg;C (min temperature) / ${Math.ceil(response.main.temp_max)}&deg;C (max temperature) `;

            let weatherType = document.getElementById('weather');
            weatherType.innerText = `${response.weather[0].main}`;

            let weatherim = document.getElementById('icons');
            weatherim = `${response.weather[0].id}`;
              
            let hum = document.getElementById('hum');
            hum.innerHTML = `Humidity is ${response.main.humidity}%`;
            
            // depending on weather the icons will change

            console.log(weatherim);
            if (weatherim == 800) {
                wicon.src = "Weather Icons/clear.svg";
                document.body.style.backgroundImage = "url('./walls/clear.jpg')";

            } else if (weatherim >= 200 && weatherim <= 232) {
                wicon.src = "Weather Icons/strom.svg";
                document.body.style.backgroundImage = "url('./walls/storm.jpg')";

            }
            else if (weatherim >= 600 && weatherim <= 622) {
                wicon.src = "Weather Icons/snow.svg";
                document.body.style.backgroundImage = "url('./walls/snow.jpg')";

            }
            else if (weatherim >= 701 && weatherim <= 781) {
                wicon.src = "Weather Icons/haze.svg";
                document.body.style.backgroundImage = "url('./walls/haze.jpg')";

            }
            else if (weatherim >= 801 && weatherim <= 804) {
                wicon.src = "Weather Icons/cloud.svg";
                document.body.style.backgroundImage = "url('./walls/cloud.jpg')";

            }
            else if ((weatherim >= 300 && weatherim <= 321) || (weatherim >= 500 && weatherim <= 531)) {
                wicon.src = "Weather Icons/rain.svg";
                document.body.style.backgroundImage = "url('./walls/rain.jpg')";

            }


            //
            let date = document.getElementById('date');
            let todayDate = new Date();
            date.innerText = dateManage(todayDate);

        }



        function dateManage(dateArg) {

            let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            let year = dateArg.getFullYear();
            let month = months[dateArg.getMonth()];
            let date = dateArg.getDate();
            let day = days[dateArg.getDay()];

            return `${date} ${month} (${day}), ${year}`;
        }


    }
    xhr.send(data)
})

console.log()