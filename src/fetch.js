export const singleTravelerData = (travelerID) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${travelerID}`)
    .then(response => response.json())
    .catch(err => showError(err));
}

export const userTripData = () => {
  return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .catch(err => showError(err));
}

export const userDestinationData = () => {
  return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
    .catch(err => showError(err));
}

export const tripPost = (newTripData) => {
  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTripData)
  })
  .then(response => isValidated(response, "tripStatus"))
  .catch(err => showError(err));
}

const showError = (err) => {
  const errorField = document.querySelector("#errorField")
  if(err.message === "Failed to fetch"){
    errorField.innerText = `Hey something went wrong check your network`
  } else {
    errorField.innerText = `${err.message}`
  }
}

const isValidated = (response, section) => {
  const statusField = document.querySelector(`#${section}`)
  if(response.ok) {
    statusField.innerText = `Added to Pending trips!`
  }
  return response.json()
}