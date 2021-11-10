const domUpdates = {
  generateHeaderContent(currentTraveler) {
    return `<div class="welcome-user-box">
             <h1>WELCOME ${currentTraveler.displayFirstName().toUpperCase()}!</h1>
            </div>
            <div class = "money-spent-box">
              <h1>TOTAL AMOUNT SPENT ON TRIPS<br>$1,000</h1>
            </div>`
  }
}

export default domUpdates;