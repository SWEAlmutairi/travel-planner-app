function addWeather(weather, container) {
  if(!weather) {
    return
  }

  let header = document.createElement('span')
  header.innerText = 'Currently'
  container.insertAdjacentElement('beforebegin', header)
  addWeatherElement(weather, container)
}
// adding forecast on the second-page section
// after getting forecast and page's element
function addForecast(forecast, container) {
  let frag = document.createDocumentFragment()
  let weatherToShow = forecast.slice(0,10)
  let header = document.createElement('span')
  header.innerText = 'Forecast'
  container.insertAdjacentElement('beforebegin', header)

  let dayForecast
  for(let weather of weatherToShow) {
    dayForecast = document.createElement('div')
    dayForecast.classList.add('day-forecast')

    let dateElm = document.createElement('h3')
    dateElm.innerText = weather.valid_date
    dayForecast.appendChild(dateElm)
    frag.appendChild(addWeatherElement(weather, dayForecast))
  }
  container.appendChild(frag)
}
// adding weather on the second-page section
// after getting weather and page's element
function addWeatherElement(weather, container) {
  let temp = document.createElement('p')
  temp.innerText = `${weather.temp} °C`
  container.appendChild(temp)

  let img = document.createElement('img')
  img.src = `https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`
  img.classList.add('weather-icon')
  container.appendChild(img)

  let description = document.createElement('p')
  description.innerText = `${weather.weather.description}`
  container.appendChild(description)
  return container
}
// adding photos on the second-page section
// after getting photos and page's element
function addPhotos(photos) {
  let frag = document.createDocumentFragment()
  let photoToShow = photos.hits.slice(0, 9)
  for (let photo of photoToShow) {
    let figure = document.createElement('figure')
    let image = document.createElement('img')
    image.src = photo.webformatURL
    image.classList.add('photo')
    let caption = document.createElement('figcaption')
    caption.innerHTML = `Author: <a href="${photo.pageURL}" target="_blank" rel="noopener">${photo.user}</a>`
    figure.appendChild(image)
    figure.appendChild(caption)
    frag.appendChild(figure)
  }
  document.querySelector('.photos').appendChild(frag)
}
// remove forecast, weather and photos from the page
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
// adding trips to the list
function addList(trips) {
  removeAllChildNodes(document.querySelector('.second-page'))
  let tripList = document.createElement('section')
  tripList.classList.add('trip-list')
  document.querySelector('.second-page').appendChild(tripList)
  let frag = document.createDocumentFragment()
  if (trips.length == 0 ) {
    let p = document.createElement('p')
    p.innerText = `There are no travel plan`
    frag.appendChild(p)
  } else {
    let tbl = document.createElement('table')
    let tblBody = document.createElement('tbody')
    let row = document.createElement('tr')
    let index = ['Place', 'Start Date', 'End Date']
    for (let i = 0; i < index.length; i++) {
      let th = document.createElement('th')
      th.classList.add('heading')
      let rowText = document.createTextNode(index[i])
      th.appendChild(rowText)
      row.appendChild(th)
    }
    tblBody.append(row)
    tbl.appendChild(tblBody)
      
    for (let trip of trips) {
      let row2 = document.createElement('tr')
      let th1 = document.createElement('th')
      let thText1 = document.createTextNode(trip.placename)
      th1.appendChild(thText1)
      let td2 = document.createElement('td')
      let tdText2 = document.createTextNode(trip.start)
      td2.appendChild(tdText2)
      let td3 = document.createElement('td')
      let tdText3 = document.createTextNode(trip.end)
      td3.appendChild(tdText3)
      row2.appendChild(th1)
      row2.appendChild(td2)
      row2.appendChild(td3)
      row2.setAttribute('data-id', 'trip')
      tblBody.appendChild(row2)
    }
    tbl.appendChild(tblBody)
    frag.appendChild(tbl)
  }
  document.querySelector('.trip-list').appendChild(frag)
  document.querySelector('.first-page').style.display = 'none'
  document.querySelector('.second-page').style.display = ''
  
}

async function clearPage() {
  let secondPage = document.querySelector('.second-page')
  if (secondPage.children.length > 0) 
  {
    removeAllChildNodes(secondPage)
  } 
  else 
  {
  let resultPageHeader = document.createElement('section')
  resultPageHeader.classList.add('result-page-header')
  let weather = document.createElement('section')
  weather.classList.add('weather')
  let currentWeather = document.createElement('div')
  currentWeather.classList.add('current-weather')
  let forecast = document.createElement('div')
  forecast.classList.add('forecast')
  weather.appendChild(currentWeather)
  weather.appendChild(forecast)
  let photos = document.createElement('section')
  photos.classList.add('photos')
  let tripDuration = document.createElement('section')
  tripDuration.classList.add('trip-duration')
  
  secondPage.appendChild(resultPageHeader)
  secondPage.appendChild(tripDuration)
  secondPage.appendChild(weather)
  secondPage.appendChild(photos)
  }
}

function countDown(time) {
  document.querySelector('.second-page').style.display = ''
  let div = document.createElement('div')
  let p = document.createElement('p')
  p.classList.add('count-down')
  div.innerHTML = `<p class="count-header> Count down!</p>`
  div.appendChild(p)
  document.querySelector('.trip-duration').appendChild(div)
  setInterval( () => {
    let now = new Date()
    let distance = time - now
    let days = Math.floor(distance / (1000 * 60 * 60 * 24))
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds  = Math.floor((distance % (1000 * 60)) / 1000)
    p.innerHTML = `<i class="fas fa-stopwatch"></i>` + "Remaining time to travel is " + days + "d " + hours + "h "
      + minutes + "m " + seconds + "s ";
  }, 1000);
  document.querySelector('.first-page').style.display = 'none'
}
// back and save button on the second-page section
function headerCreate() {
  let div = document.createElement('div')
  div.classList.add('header')
  let backbutton = document.createElement('button')
  backbutton.appendChild(document.createTextNode('Back'))
  backbutton.setAttribute('data-id', 'back-page')
  if (backbutton) {
    backbutton.addEventListener('click', () => {clearPage(), document.querySelector('.second-page').style.display = 'none', document.querySelector('.first-page').style.display = '', document.querySelector('form[name="details"]').reset() })
  }
  div.appendChild(backbutton)

  let savebutton = document.createElement('button')
  savebutton.appendChild(document.createTextNode('Save'))
  savebutton.setAttribute('data-id', 'trip-save')
  if (savebutton) {
    savebutton.addEventListener('click', () => Client.savePlan())
  }
  div.appendChild(savebutton)
  document.querySelector('.result-page-header').appendChild(div)
}

export {
  addWeather,
  addForecast,
  addPhotos,
  addList,
  clearPage,
  countDown,
  headerCreate
}