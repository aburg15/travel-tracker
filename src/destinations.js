class Destinations {
  constructor(dataset) {
    this.id = dataset.id;
    this.destination = dataset.destination;
    this.estimatedLodgingCostPerDay = dataset.estimatedLodgingCostPerDay;
    this.estimatedFlightCostPerPerson = dataset.estimatedFlightCostPerPerson;
    this.image = dataset.image;
    this.alt = dataset.alt;
  }
}

export default Destinations;