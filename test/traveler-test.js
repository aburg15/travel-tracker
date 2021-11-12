import chai from 'chai';
import Destination from '../src/destination';
import Traveler from '../src/traveler'
import Trip from '../src/trip'
const expect = chai.expect;

describe('Traveler', function() {

let travelerData, traveler1, traveler2, tripData, trip, destination, destinationData;

  beforeEach(function() {
    travelerData = [{
      id: 6,
      name: "Laverna Flawith",
      travelerType: "shopper"
    },
    {
      id: 29,
      name: "Oliviero Tunuy",
      travelerType: "shopper"
    }];

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
    
    destinationData = [
    {
      id: 36,
      destination: "Reykjavík, Iceland",
      estimatedLodgingCostPerDay: 900,
      estimatedFlightCostPerPerson: 120,
      image: "https://images.unsplash.com/photo-1515005319369-c4406c3f832b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      alt: "frozen river in the middle of rock mountains"
    },
    {
      id: 47,
      destination: "Zürich, Switzerland",
      estimatedLodgingCostPerDay: 1100,
      estimatedFlightCostPerPerson: 110,
      image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
      alt: "opera house and city buildings on the water with boats"
    },
    {
      id: 48,
      destination: "Dar es Salaam, Tanzania",
      estimatedLodgingCostPerDay: 1200,
      estimatedFlightCostPerPerson: 100,
      image: "https://images.unsplash.com/photo-1568625502763-2a5ec6a94c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
      alt: "aerial photography of high-rise building"
    }

  
  ]

    traveler1 = new Traveler(travelerData[0]);
    traveler2 = new Traveler(travelerData[1])
    trip = new Trip(tripData);
    destination = new Destination(destinationData)
  })

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should store traveler data', function() {
    expect(traveler1.dataset.id).to.equal(6);
    expect(traveler1.dataset.name).to.equal("Laverna Flawith");
    expect(traveler1.dataset.travelerType).to.equal("shopper");
  })

  it('should be able to show travelers first name', function() {
    expect(traveler2.displayFirstName()).to.equal("Oliviero")
  })

  it('should be able to assemble trips by traveler', function() {
    traveler1.assembleTripsByTraveler(tripData)
    expect(traveler1.allTrips).to.deep.equal([tripData[0], tripData[1]])
  })

  it('should be able to calculate the total amount spent on trips during 2021', function() {
    traveler1.assembleTripsByTraveler(tripData)
    traveler2.assembleTripsByTraveler(tripData)
    expect(traveler1.amountSpentOnTripsByTraveler(destinationData)).to.equal(191150);
    expect(traveler2.amountSpentOnTripsByTraveler(destinationData)).to.equal(102500);

  })

});



