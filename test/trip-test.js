import chai from 'chai';
import Trip from '../src/trip'
const expect = chai.expect;

describe('Trip', function() {

  let tripData, trip;
  
  beforeEach(function() {
    tripData = {
      id: 1,
      userID: 44,
      destinationID: 49,
      travelers: 1,
      date: "2022/09/16",
      duration: 8,
      status: "approved",
      suggestedActivities: []
    };
    trip = new Trip(tripData)
  })
  
  it('should be a function', function() {
    expect(Trip).to.be.a('function');
  });
  
  it('should store trip data', function() {
    expect(trip.dataset.id).to.equal(1);
    expect(trip.dataset.userID).to.equal(44);
    expect(trip.dataset.destinationID).to.equal(49);
    expect(trip.dataset.travelers).to.equal(1);
    expect(trip.dataset.date).to.equal("2022/09/16");
    expect(trip.dataset.duration).to.equal(8);
    expect(trip.dataset.status).to.equal("approved");
    expect(trip.dataset.suggestedActivities).to.deep.equal([]);
  })
});