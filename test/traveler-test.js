import chai from 'chai';
import Traveler from '../src/traveler'
const expect = chai.expect;

describe('Traveler', function() {

let travelerData, traveler;

  beforeEach(function() {
    travelerData = {
      id: 1,
      name: "Ham Leadbeater",
      travelerType: "relaxer"
    };
    traveler = new Traveler(travelerData)
  })

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should store traveler data', function() {
    expect(traveler.id).to.equal(1);
    expect(traveler.name).to.equal("Ham Leadbeater");
    expect(traveler.travelerType).to.equal("relaxer");
  })

  it('should be able to show travelers first name', function() {
    expect(traveler.displayFirstName()).to.equal("Ham")
  })
});



