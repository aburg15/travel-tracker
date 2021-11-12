import chai from 'chai';
import Destination from '../src/destination'
const expect = chai.expect;

describe('Destination', function() {

  let destinationData, destination;
  
    beforeEach(function() {
      destinationData = {
        id: 1,
        destination: "Lima, Peru",
        estimatedLodgingCostPerDay: 70,
        estimatedFlightCostPerPerson: 400,
        image: "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        alt: "overview of city buildings with a clear sky"
      };
      destination = new Destination(destinationData)
    })
  
    it('should be a function', function() {
      expect(Destination).to.be.a('function');
    });
  
    it('should store destination data', function() {
      expect(destination.dataset.id).to.equal(1);
      expect(destination.dataset.destination).to.equal("Lima, Peru");
      expect(destination.dataset.estimatedLodgingCostPerDay).to.equal(70);
      expect(destination.dataset.estimatedFlightCostPerPerson).to.equal(400);
      expect(destination.dataset.image).to.equal("https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80");
      expect(destination.dataset.alt).to.equal("overview of city buildings with a clear sky");
    })
  });