class Traveler {
  constructor(dataset) {
    this.dataset = dataset;
    this.allTrips = [];
    this.allDestinations = [];
  }

  displayFirstName() {
    const firstName = this.dataset.name.split(' ');
    return firstName[0];
  }

  assembleTripsByTraveler(trips) {
    return trips.forEach((trip) => {
      if (this.dataset.id === trip.userID) {
        this.allTrips.push(trip)
      }
      console.log(this.allTrips)
    })  
  }  

  assembleDestinationsByTraveler(destinations) {
    return destinations.forEach((userDestinations) => {
      this.allTrips.forEach((userTrips) => {
        if (userDestinations.id === userTrips.destinationID) {
          this.allDestinations.push(userDestinations)
        }
      })
    })
  }

  

  amountSpentOnTripsByTraveler(destinations) {
    const amountSpent = destinations.reduce((acc, entry) => {
      this.allTrips.forEach((userTrip) => {        
        if (entry.id === userTrip.destinationID && userTrip.date.split('/').includes('2021')) {
          acc += 
            (((userTrip.duration * entry.estimatedLodgingCostPerDay) * 
            (userTrip.travelers)) + 
            (entry.estimatedFlightCostPerPerson * userTrip.travelers))
        }
      })
      return acc;
    }, 0)
    return (amountSpent + (amountSpent * .1)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export default Traveler;


