import './css/base.scss';
import { userTripData, userDestinationData, tripPost, singleTravelerData } from './fetch';
import Traveler from './traveler';
import Trip from './trip';
import Destination from './destination';
import domUpdates from './domUpdates.js';
import './images/travel-icon.png';
import './images/traveler-icon.png';

const header = document.querySelector('#headingGreet');
const tripCardContainer = document.querySelector('#gridContainer');
const tripForm = document.querySelector('#formContainer');
const tripFormDestinations = document.querySelector('#formDestinations');
const estimateCost = document.querySelector('#getQuote');
const formDuration = document.querySelector('#formDuration');
const formTravelers = document.querySelector('#formTravelers');
const pendingTripCost = document.querySelector('#pendingTripCost');
const allTripsBtn = document.querySelector('#allTripsBtn');
const approvedTripsBtn = document.querySelector('#approvedTripsBtn');
const pendingTripsBtn = document.querySelector('#pendingTripsBtn');
const loginBtn = document.querySelector('#loginButton');
const usernameInput = document.querySelector('#usernameInput');
const passwordInput = document.querySelector('#passwordInput');
const loginBox = document.querySelector('#loginBox');
const tripButtons = document.querySelector('#tripButtons');
const wrongPwdField = document.querySelector('#wrongPasswordField');

let currentTraveler, destinationData, tripData;

const fetchData = (travelerID) => {
  return Promise.all([userTripData(), userDestinationData(), singleTravelerData(travelerID)])  
    .then(data => parseData(data, travelerID));
}

const parseData = (data, travelerID) => {
  const tripEntries = data[0].trips;
  const destinationEntries = data[1].destinations;
  const singleTraveler = data[2];
  loadPage([tripEntries, destinationEntries, singleTraveler], travelerID);
}

const loadPage = (data) => {
  tripData = new Trip(data[0]).dataset;
  destinationData = new Destination(data[1]).dataset;
  currentTraveler = new Traveler(data[2]);
  currentTraveler.assembleTripsByTraveler(tripData);
  currentTraveler.assembleDestinationsByTraveler(destinationData);
  const amountSpentByTraveler = currentTraveler.amountSpentOnTripsByTraveler(destinationData);
  addDestinationsToTripForm(destinationData);
  addCardsToTripContainer();
  header.innerHTML = domUpdates.generateHeaderContent(currentTraveler, amountSpentByTraveler);
}

const addCardsToTripContainer = () => {
  currentTraveler.allDestinations.forEach((destination, index) => {
    tripCardContainer.innerHTML += domUpdates.renderTripCardsWithDestinationInfo(currentTraveler.allTrips[index], destination); 
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

tripForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newTrip = {
    id: Date.now(),
    userID: currentTraveler.dataset.id, 
    destinationID: findDestination(formData.get('destination')),
    travelers: Number(formData.get('travelers')),
    date: formData.get('date').replace(/-/gi, "/"),
    duration: Number(formData.get('duration')),
    status: "pending",
    suggestedActivities: []
  };
  tripPost(newTrip);
  e.target.reset();
  currentTraveler.allTrips.push(newTrip);
  currentTraveler.addPostDestinationToTravelerDestinations(newTrip, destinationData)
  pendingTripCost.innerHTML = '';
})

estimateCost.addEventListener('click', estimateTripCost);

const filterPendingTrips = () => {
  tripCardContainer.innerHTML = '';
  currentTraveler.allTrips.forEach((trip, index) => {
    if (trip.status === 'pending') {
      tripCardContainer.innerHTML += domUpdates.renderTripCardsWithDestinationInfo(trip, currentTraveler.allDestinations[index]);
    }
  })
}
    
pendingTripsBtn.addEventListener('click', filterPendingTrips)

const filterApprovedTrips = () => {
  tripCardContainer.innerHTML = '';
  currentTraveler.allTrips.forEach((trip, index) => {
    if (trip.status === 'approved') {
      tripCardContainer.innerHTML += domUpdates.renderTripCardsWithDestinationInfo(trip, currentTraveler.allDestinations[index]);
    }
  })
}
    
approvedTripsBtn.addEventListener('click', filterApprovedTrips)

const showAllTrips = () => {
  tripCardContainer.innerHTML = '';
  currentTraveler.allTrips.forEach((trip, index) => {
    if (trip.status === 'approved' || trip.status === 'pending') {
      tripCardContainer.innerHTML += domUpdates.renderTripCardsWithDestinationInfo(trip, currentTraveler.allDestinations[index] );
    }
  })
}

allTripsBtn.addEventListener('click', showAllTrips)

const findDestination = (destinationName) => {
  const destinationID = destinationData.find((entry) => {
    return entry.destination.includes(destinationName)
  })
  return destinationID.id;
}

const verifyLogin = () => {
  if (passwordInput.value === 'travel') {
    show(tripCardContainer);
    show(header);
    show(tripButtons);
    show(tripForm);
    hide(loginBox);
    const travelerID = usernameInput.value.slice(8);
    fetchData(travelerID)
  } else {
    wrongPwdField.innerText = 'Incorrect password! Please try again.'
  }
}

loginBtn.addEventListener('click', verifyLogin)

const show = (element) => {
  element.classList.remove('hidden');
}

const hide = (element) => {
  element.classList.add('hidden');
}




