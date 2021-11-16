const domUpdates = {
  generateHeaderContent(currentTraveler, amountSpentByTraveler) {
    return `<div class = "money-spent-box">
              <div class ="card-image">
                <img src="/images/traveler-icon.png" alt="traveler-icon" class="traveler-icon">
              </div>
                <h1 class="money-spent-text">WELCOME, ${currentTraveler.displayFirstName().toUpperCase()}!</h1>
                <h1 class="money-spent-text">TOTAL SPENT THIS YEAR: $${amountSpentByTraveler}</h1>
            </div>`
  },

  renderTripCardsWithDestinationInfo(destinationsByTraveler, tripsByTraveler) {
    return `<div class="box-all-trips">
              <h2 class="card-header">${destinationsByTraveler.destination}</h2>
              <div class="card-image-box">
                <img src=${destinationsByTraveler.image} alt=${destinationsByTraveler.alt} class="card-image">
              </div>
              <div class="card-footer">          
                <h4 class="footer-text">Travelers: ${tripsByTraveler.travelers}</h4>
                <h4 class="footer-text">Duration: ${tripsByTraveler.duration}</h4>
                <h4 class="footer-text">Trip Status: ${destinationsByTraveler.status}</h4>
              </div>
            </div>
    `
  },

  addDestinationsToForm(destination) {
    return `<option value=${destination} name="destination">${destination}</option>`

  },

  addEstimatedTripCost(tripCost) {
    return `<h5>Estimated Cost: $${tripCost}</h5>`
  }

}

export default domUpdates;
