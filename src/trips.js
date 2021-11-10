class Trips {
  constructor(dataset) {
    this.id = dataset.id;
    this.userID = dataset.userID;
    this.destinationID = dataset.destinationID;
    this.travelers = dataset.travelers;
    this.date = dataset.date;
    this.duration = dataset.duration;
    this.status = dataset.status;
    this.suggestedActivities = dataset.suggestedActivities;
  }
}

export default Trips;