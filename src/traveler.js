class Traveler {
  constructor(dataset) {
    this.dataset = dataset;
    // this.id = dataset.id;
    // this.name = dataset.name;
    // this.travelerType = dataset.travelerType;
    this.allTrips = [];
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
    })  
  }  

  amountSpentOnTripsByTraveler(destinations) {
    const travelerDestinations = destinations.filter((destination) => {
      return this.dataset.id === destination.userID
    })

    return travelerDestinations.reduce((acc, entry) => {
      console.log(entry)
      acc += (entry.travelers * 2)
      return acc;
    }, 0)
  }

}

export default Traveler;


