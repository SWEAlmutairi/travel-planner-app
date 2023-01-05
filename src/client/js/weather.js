async function getWeather(lat, lng) {
  let urlParams = new URLSearchParams({ lat: lat, lon: lng })
  fetch(`http://localhost:8083/weather/${urlParams}`, {
    method: 'GET',
  })
  .then((res) => res.json())
  .then(function(data) {
    let weather = data.data[0]
    Client.addWeather(weather, document.querySelector('.current-weather'))
  })
}

async function getForecast(lat, lng) {
  let urlParams = new URLSearchParams({ lat: lat, lon: lng })
  fetch(`http://localhost:8083/forecast/${urlParams}`, {
    method: 'GET',
  })
  .then((res) => res.json())
  .then(function(data) {
    let forecast = data.data
    Client.addForecast(forecast, document.querySelector('.forecast'))
  })
}

export { 
  getWeather,
  getForecast
 }
