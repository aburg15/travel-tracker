export const travelerData = () => {
  return fetch('http://localhost:3001/api/v1/travelers')
    .then(response => response.json())
}

export const singleTravelerData = (travelerID) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${travelerID}`)
    .then(response => response.json())
}

export const userTripData = () => {
  return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
}

export const userDestinationData = () => {
  return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
}

export const tripPost = (newTripData) => {
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTripData)
  })
  .then(response => isValidated(response, "tripStatus"))
  // .catch(err => showError(err));
}

const isValidated = (response, section) => {
  const statusField = document.querySelector(`#${section}`)
  if(response.ok) {
    statusField.innerText = `Trip added!`
  }
  return response.json()
}