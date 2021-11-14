// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import { travelerData, userTripData, userDestinationData, tripPost } from './fetch';
import Traveler from './traveler';
import Trip from './trip';
import Destination from './destination';
import TravelerRepository from './travelerRepository';
import { generateRandomIndex } from './utils';
import domUpdates from './domUpdates.js';


const header = document.querySelector('#headingGreet');
const tripCardContainer = document.querySelector('#gridContainer');
const cardFooter = document.querySelector('#cardFooter');
const tripForm = document.querySelector('#formContainer');
const tripFormDestinations = document.querySelector('#formDestinations');
const estimateCost = document.querySelector('#getQuote');
const formDuration = document.querySelector('#formDuration');
const formTravelers = document.querySelector('#formTravelers');
const pendingTripCost = document.querySelector('#pendingTripCost');

let currentTraveler, destinationData, tripData;

const fetchData = () => {
  return Promise.all([travelerData(), userTripData(), userDestinationData()])
    .then(data => parseData(data));
}

const parseData = (data) => {
  const travelersData = data[0].travelers;
  const tripEntries = data[1].trips;
  const destinationEntries = data[2].destinations;
  loadPage([travelersData, tripEntries, destinationEntries])
}

const loadPage = (data) => {
  const allTravelers = new TravelerRepository(data[0]);
  tripData = new Trip(data[1]).dataset;
  destinationData = new Destination(data[2]).dataset;
  const randomIndex = generateRandomIndex(allTravelers.travelers);
  // USING USER ID 43 BELOW RIGHT NOW, MAY NEED TO UPDATE TO BE RANDOM USER LATER
  currentTraveler = new Traveler(allTravelers.travelers[1]);
  currentTraveler.assembleTripsByTraveler(tripData);
  currentTraveler.assembleDestinationsByTraveler(destinationData);
  const amountSpentByTraveler = currentTraveler.amountSpentOnTripsByTraveler(destinationData);
  generateTripCardWithDestinationInfo(currentTraveler);
  addDestinationsToTripForm(destinationData);
  header.innerHTML = domUpdates.generateHeaderContent(currentTraveler, amountSpentByTraveler);
}

const generateTripCardWithDestinationInfo = (currentTraveler) => {
  currentTraveler.allDestinations.forEach((destination) => {
    currentTraveler.allTrips.forEach((trip) => {
      if (trip.destinationID === destination.id && trip.status === 'pending') {
        destination.status = 'pending'
      } else if (trip.destinationID === destination.id && trip.status === 'approved') {
        destination.status = 'approved'
      }
    })
    tripCardContainer.innerHTML += domUpdates.renderTripCardsWithDestinationInfo(destination);
  })
}

const addDestinationsToTripForm = (destinationData) => {
  destinationData.forEach((destination) => {
    tripFormDestinations.innerHTML += domUpdates.addDestinationsToForm(destination.destination);
  })
}

const estimateTripCost = () => {
  const duration = formDuration.value;
  const travelers = formTravelers.value;
  const destinationID = findDestination(tripFormDestinations.value);
  const estimatedCost = destinationData.reduce((acc, entry) => {
    if (destinationID === entry.id) {
      acc += (((duration * entry.estimatedLodgingCostPerDay) *
      (travelers)) + 
      (travelers * entry.estimatedFlightCostPerPerson))
    }
    return acc;
  }, 0)
  const totalCost = (estimatedCost + (estimatedCost * .1)).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  pendingTripCost.innerHTML = domUpdates.addEstimatedTripCost(totalCost)
}

window.addEventListener('load', fetchData)

tripForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newTrip = {
    id: Date.now(),
    userID: currentTraveler.dataset.id, 
    destinationID: findDestination(formData.get('destination')),
    travelers: Number(formData.get('travelers')),
    date: formData.get('date').replace(/-/gi,"/"),
    duration: Number(formData.get('duration')),
    status: "pending",
    suggestedActivities: []
  };
  tripPost(newTrip);
  e.target.reset();
})

estimateCost.addEventListener('click', estimateTripCost)

const findDestination = (destinationName) => {
  const destinationID = destinationData.find((entry) => {
    return entry.destination.includes(destinationName)
  })
  return destinationID.id;
}

