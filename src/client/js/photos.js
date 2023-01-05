

async function getImages(placename) {
  let urlParams = new URLSearchParams( {q: placename, image_type: 'photo', category: 'places', safesearch: true, orientation: 'horizontal'})
  fetch(`http://localhost:8083/photos/${urlParams}`,{
    method: 'GET',
  })
  .then((res) => res.json())
  .then(function(data) {
    let photos = data
    Client.addPhotos(photos)
  })
}

export { getImages }