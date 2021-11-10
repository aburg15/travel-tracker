class Travelers {
  constructor(dataset) {
    this.id = dataset.id;
    this.name = dataset.name;
    this.travelerType = dataset.travelerType;
  }

  displayFirstName() {
    const firstName = this.name.split(' ');
    return firstName[0];
  }
}

export default Travelers;