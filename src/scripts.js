import './css/base.scss';
import { travelerData, userTripData, userDestinationData } from './fetch';
import Traveler from './traveler';
import Trips from './trips';
import Destinations from './destinations';
import TravelerRepository from './travelerRepository';
import { generateRandomIndex } from './utils';
import domUpdates from './domUpdates.js';

const header = document.querySelector('#headingGreet');



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
  const tripData = new Trips(data[1]);
  const destinationData = new Destinations(data[2]);
  const randomIndex = generateRandomIndex(allTravelers.travelers);
  const currentTraveler = new Traveler(allTravelers.travelers[randomIndex]);
  header.innerHTML = domUpdates.generateHeaderContent(currentTraveler);
  
}

window.addEventListener('load', fetchData)