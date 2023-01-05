
import { validation } from './validations'
import { retreiveTrips } from './trip'

window.addEventListener('load', () => {
  const preload = document.querySelector('.preload')
  preload.classList.add('preload-finish')
})

let submitButton = document.querySelector('form[name="details"]')
if(submitButton) {
  document.querySelector('.submitButton').disabled = true
  submitButton.addEventListener('change', validation)
  
  submitButton.addEventListener('submit', handleSubmit)
}

let retractButton = document.querySelector('button[data-id="latest-trip"]')
if (retractButton) {
  retractButton.addEventListener('click', retreiveTrips)  
}

async function handleSubmit(event) {
  event.preventDefault()
  Client.clearPage()
  let placename = document.querySelector('input[name="place"]').value
  await Client.getPlace(placename)
}

async function savePlan() {
  let placename = document.querySelector('input[name="place"]').value
  let start = document.querySelector('input[name="start-date').value
  let end = document.querySelector('input[name="end-date"]').value

  let body = { placename: placename, start: start, end: end }
  localStorage.setItem(localStorage.length, JSON.stringify(body))

  let data = JSON.parse(localStorage.getItem(localStorage.length -1 ))

  if(Client.objEqualityCheck(data, body)) {
    alert(`Your trip to ${placename} from ${data.start} to ${data.end} has been saved!`) 
  } else {
    alert(`Something went wrong while saving your trip`)
  }
  document.querySelector('button[data-id="trip-save"]').disabled = true
}

export { handleSubmit, savePlan}