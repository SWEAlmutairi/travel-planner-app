function validation() {
  const place = document.querySelector('input[name="place"]').value
  const start = new Date(document.querySelector('input[name="start-date"]').value)
  const end = new Date(document.querySelector('input[name="end-date"]').value)

  if (placeValidation(place) && startDateValidation(start) && endDateValidation(start, end)) {
    document.querySelector('.submitButton').disabled = false
  } else {
    document.querySelector('.submitButton').disabled = true
  }
}



function placeValidation(place) {
  if ( place != '') {
    document.querySelector(".place-validation").innerText = ""
    return true
  } else {
    document.querySelector(".place-validation").innerText = "Place name should be entered"
    return false
  }
}

function startDateValidation(start) {
  if (start >= new Date) {
    document.querySelector(".start-date-validation").innerText = ""
    return true
  } else {
    document.querySelector(".start-date-validation").innerText = "Start date should be more than today"
    return false
  }
 
}

function endDateValidation(start, end) {
  if (end >= start) {
    document.querySelector(".end-date-validation").innerText = ""
    return true
  } else {
    document.querySelector(".end-date-validation").innerText = "End date should be more than start date"
    return false
  }
}

function objEqualityCheck(obj1, obj2) {
  if (obj1.placename == obj2.placename && obj1.start == obj2.start && obj1.end == obj2.end) {
    return true
  } else {
    return false
  }
}

export { validation, objEqualityCheck }