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
const tripForm = document.querySelector('#formContainer');

let currentTraveler;

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
  // USING USER ID 43 BELOW RIGHT NOW, MAY NEED TO UPDATE TO BE RANDOM USER LATER
  currentTraveler = new Traveler(allTravelers.travelers[43]);
  console.log(currentTraveler)
  currentTraveler.assembleTripsByTraveler(tripData);
  currentTraveler.assembleDestinationsByTraveler(destinationData);
  const amountSpentByTraveler = currentTraveler.amountSpentOnTripsByTraveler(destinationData);
  generateTripCard(currentTraveler);
  
  header.innerHTML = domUpdates.generateHeaderContent(currentTraveler, amountSpentByTraveler);
}

const generateTripCard = (currentTraveler) => {
  currentTraveler.allDestinations.forEach((destination) => {
    tripCardContainer.innerHTML += domUpdates.renderTripCards(destination)
  })
}

window.addEventListener('load', fetchData)


tripForm.addEventListener('submit',(e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newTrip = {
    id: Date.now(),
    userID: currentTraveler.dataset.id, 
    destinationID: 30,
    travelers: 5,
    date: "2021/12/1",
    duration: 10,
    status: "pending",
    suggestedActivities: []
  };
  tripPost(newTrip);
  e.target.reset();
})

