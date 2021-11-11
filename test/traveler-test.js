import chai from 'chai';
import Traveler from '../src/traveler'
import Trip from '../src/trip'
const expect = chai.expect;

describe('Traveler', function() {

let travelerData, traveler, tripData, trip;

  beforeEach(function() {
    travelerData = {
      id: 6,
      name: "Laverna Flawith",
      travelerType: "shopper"
    };

    tripData = [{
      id: 33,
      userID: 6,
      destinationID: 36,
      travelers: 5,
      date: "2020/03/26",
      duration: 19,
      status: "approved",
      suggestedActivities: []
    },
    {
      id: 191,
      userID: 6,
      destinationID: 47,
      travelers: 5,
      date: "2019/08/17",
      duration: 19,
      status: "approved",
      suggestedActivities: []
    },
    {
      id: 192,
      userID: 29,
      destinationID: 48,
      travelers: 5,
      date: "2019/09/24",
      duration: 17,
      status: "approved",
      suggestedActivities: []
    }]  

    traveler = new Traveler(travelerData);
    trip = new Trip(tripData);
  })

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should store traveler data', function() {
    expect(traveler.id).to.equal(6);
    expect(traveler.name).to.equal("Laverna Flawith");
    expect(traveler.travelerType).to.equal("shopper");
  })

  it('should be able to show travelers first name', function() {
    expect(traveler.displayFirstName()).to.equal("Laverna")
  })

  it('should be able to assemble trips by traveler', function() {
    traveler.assembleTripsByTraveler(tripData)
    expect(traveler.allTrips).to.deep.equal([tripData[0], tripData[1]])
  })

});



