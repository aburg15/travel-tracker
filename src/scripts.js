import './css/base.scss';
import { travelerData, userTripData, userDestinationData } from './fetch';
import Traveler from './traveler';
import Trip from './trip';
import Destination from './destination';
import TravelerRepository from './travelerRepository';
import { generateRandomIndex } from './utils';
import domUpdates from './domUpdates.js';

const header = document.querySelector('#headingGreet');
const tripCardContainer = document.querySelector('#gridContainer')


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
  const tripData = new Trip(data[1]).dataset;
  const destinationData = new Destination(data[2]).dataset;
  const randomIndex = generateRandomIndex(allTravelers.travelers);
  const currentTraveler = new Traveler(allTravelers.travelers[randomIndex]);
  const logTripsByTraveler = currentTraveler.assembleTripsByTraveler(tripData);
  const logDestinationsByTraveler = currentTraveler.assembleDestinationsByTraveler(destinationData);
  const amountSpentByTraveler = currentTraveler.amountSpentOnTripsByTraveler(destinationData);

  header.innerHTML = domUpdates.generateHeaderContent(currentTraveler, amountSpentByTraveler);
  tripCardContainer.innerHTML = domUpdates.renderTripCards(currentTraveler.allTrips, currentTraveler.allDestinations)
}

window.addEventListener('load', fetchData)