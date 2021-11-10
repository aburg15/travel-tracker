export const travelerData = () => {
  return fetch('http://localhost:3001/api/v1/travelers')
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