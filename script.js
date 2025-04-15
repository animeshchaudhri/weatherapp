const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const rainAlert = document.getElementById('rain-alert');
weatherForm.addEventListener('submit', (event) => {
    hideDiv()
    event.preventDefault();
    changecolour()
  
    const city = cityInput.value;
    fetch(`https://api.weatherapi.com/v1/current.json?key=&q=${city}`)
  .then(response => response.json())
    .then(data => {
     
      const temperatureValue = data.current.temp_c;
      const humidityValue = data.current.humidity;
      const windSpeedValue = data.current.wind_kph;

     
      cityName.textContent = city;
      temperature.textContent = `${temperatureValue}°C`;
      humidity.textContent = `${humidityValue}%`;
      windSpeed.textContent = `${windSpeedValue} kph`;
     
      speakTemperatureHumidityWindSpeed(temperatureValue, humidityValue, windSpeedValue)
    });
    
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=099fe78a182b48efbf880136230101&q=${city}`)
  .then(response => response.json())
  .then(data => {
    
    const rainyDay = data.forecast.forecastday.find(day => day.day.condition.text.toLowerCase().includes('rain'));

    
    if (rainyDay) {
      
      const rainyDate = rainyDay.date;
      rainbro()
      speakHindiPunjabi(rainyDate)
      rainAlert.textContent = `It is expected to rain on ${rainyDate}.`;
      
    } else {
      norainbro()
      rainAlert.textContent = 'There is no rain forecasted in the next 5 days.';
    }
  });

});
function hideDiv() {
    document.getElementById("weather-form").style.display = "none";
    return true;
  }
function changecolour()  {
  document.getElementById("weather-data").style.display = "block";
    document.getElementById("hehe").style.color = "#FAF7F7";
    document.getElementById("hehe2").style.color = "#FAF7F7";
    document.getElementById("hehe3").style.color = "#FAF7F7";
    document.getElementById("city-name").style.color = "#FAF7F7";
    document.getElementById("temperature").style.color = "#FAF7F7";
    document.getElementById("humidity").style.color = "#FAF7F7";
    
    document.getElementById("wind-speed").style.color = "#FAF7F7";
    document.getElementById("rain-alert").style.color = "#FAF7F7";
    document.getElementById("hehe4").style.display = "none";
   
    return true;
}
function rainbro(){
    document.getElementById("hehe4").style.color = "#FAF7F7";
    document.getElementById("rain-alert").style.color = "#FAF7F7";
}


function speakHindiPunjabi(rainyDate) {
  const hindiUtterance = new SpeechSynthesisUtterance();
  hindiUtterance.text = `${rainyDate} को बारिश होगी`;
  hindiUtterance.lang = 'hi-IN';



  
    
      window.speechSynthesis.speak(hindiUtterance);}
      
    
  

function speakTemperatureHumidityWindSpeed(temperatureValue, humidityValue, windSpeedValue) {
  const utterance = new SpeechSynthesisUtterance();
  utterance.text =  `आज का तापमान ${temperatureValue} और नमी ${humidityValue} है, और हवा की गति ${windSpeedValue} है।`;
  utterance.lang = 'hi-IN';

  window.speechSynthesis.speak(utterance);
}
function norainbro(){
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = "अगले 5 दिनों में बारिश की कोई संभावना नहीं है"
  utterance.lang = 'hi-IN';

  window.speechSynthesis.speak(utterance);
}
