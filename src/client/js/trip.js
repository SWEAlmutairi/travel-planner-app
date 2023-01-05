function retreiveTrips() {
  let trips = []
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i)
    if (!isNaN(parseInt(key))) {
      let value = JSON.parse(localStorage.getItem(key))
      trips.push(value)
    }
  }
  Client.addList(trips)
}

export {retreiveTrips}