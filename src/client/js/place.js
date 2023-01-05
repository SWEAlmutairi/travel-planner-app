const username = 'jiwonhan'

async function getPlace(placeName) {
  let urlParams = new URLSearchParams({ placename: placeName, username: username})
  fetch(`http://localhost:8083/places/${urlParams}`, {
    method: 'GET',
  })
  .then((res) => res.json())
  .then(function(data) {
    let {lat, lng } = data.postalCodes[0]
  let start = new Date(document.querySelector('input[name="start-date"]').value)
  let end = new Date(document.querySelector('input[name="end-date"]').value)
  let inAWeek = new Date()
  start.setHours(24)
  start.setMinutes(0)
  start.setSeconds(0)
  Client.headerCreate()
  Client.countDown(start)
  inAWeek.setDate(new Date().getDate()+ 7)
  if (start < inAWeek) {
    Client.getWeather(lat, lng)
  }
  Client.getForecast(lat, lng)
  Client.getImages(placeName)
  })
}

export { getPlace }
