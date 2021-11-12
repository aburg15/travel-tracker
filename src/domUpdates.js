const domUpdates = {
  generateHeaderContent(currentTraveler, amountSpentByTraveler) {
    return `<div class="welcome-user-box">
             <h1>WELCOME ${currentTraveler.displayFirstName().toUpperCase()}!</h1>
            </div>
            <div class = "money-spent-box">
              <h1>TOTAL SPENT THIS YEAR: <br> $${amountSpentByTraveler}</h1>
            </div>`
  },

  renderTripCards(tripsByTraveler, destinationsByTraveler) {
    return `<div class="box">
              <h2 class="card-header">${destinationsByTraveler[0].destination}</h2>
              <div class="card-image-box">
                <img src=${destinationsByTraveler[0].image} alt=${destinationsByTraveler[0].alt} class="card-image">
              </div>
              <div class="card-footer">
                <h3 class="footer-text">Date: ${tripsByTraveler[0].date}</h3>
                <h3 class="footer-text">Number of Travelers: ${tripsByTraveler[0].travelers}</h3>
                <h3 class="footer-text">Duration: ${tripsByTraveler[0].duration}</h3>
              </div>
            </div>
    
    `
  }

}

export default domUpdates;

