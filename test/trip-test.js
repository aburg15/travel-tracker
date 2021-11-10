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
      expect(trip.id).to.equal(1);
      expect(trip.userID).to.equal(44);
      expect(trip.destinationID).to.equal(49);
      expect(trip.travelers).to.equal(1);
      expect(trip.date).to.equal("2022/09/16");
      expect(trip.duration).to.equal(8);
      expect(trip.status).to.equal("approved");
      expect(trip.suggestedActivities).to.deep.equal([]);
    })
  });