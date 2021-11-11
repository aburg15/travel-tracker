class Traveler {
  constructor(dataset) {
    this.id = dataset.id;
    this.name = dataset.name;
    this.travelerType = dataset.travelerType;
    this.allTrips = [];
  }

  displayFirstName() {
    const firstName = this.name.split(' ');
    return firstName[0];
  }

  assembleTripsByTraveler(trips) {
    return trips.forEach((trip) => {
      if (this.id === trip.userID) {
        this.allTrips.push(trip)
      }
    })
  }  

  amountSpentOnTrips() {

  }
  

}

export default Traveler;