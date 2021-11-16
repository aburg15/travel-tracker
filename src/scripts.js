// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import { travelerData, userTripData, userDestinationData, tripPost, singleTravelerData } from './fetch';
import Traveler from './traveler';
import Trip from './trip';
import Destination from './destination';
import TravelerRepository from './travelerRepository';
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
  return Promise.all([travelerData(), userTripData(), userDestinationData(), singleTravelerData(travelerID)])
    .then(data => parseData(data, travelerID));
}

const parseData = (data, travelerID) => {
  const travelersData = data[0].travelers;
  const tripEntries = data[1].trips;
  const destinationEntries = data[2].destinations;
  const singleTraveler = data[3];
  loadPage([travelersData, tripEntries, destinationEntries, singleTraveler], travelerID);
}

const loadPage = (data, travelerID) => {
  const allTravelers = new TravelerRepository(data[0]);
  tripData = new Trip(data[1]).dataset;
  destinationData = new Destination(data[2]).dataset;
  currentTraveler = new Traveler(allTravelers.travelers[travelerID - 1]);
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
        destination.status = 'Pending'
      } else if (trip.destinationID === destination.id && trip.status === 'approved') {
        destination.status = 'Approved'
      }
    })
  })
  addCardsToTripContainer();
}

const addCardsToTripContainer = () => {
  currentTraveler.allDestinations.forEach((destination, index) => {
    tripCardContainer.innerHTML += domUpdates.renderTripCardsWithDestinationInfo(destination, currentTraveler.allTrips[index]); 
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
  currentTraveler.allTrips.push(newTrip);
  currentTraveler.assembleDestinationsByTraveler(destinationData)
  pendingTripCost.innerHTML = '';
})


estimateCost.addEventListener('click', estimateTripCost);

const filterPendingTrips = () => {
  tripCardContainer.innerHTML = '';
  currentTraveler.allDestinations.forEach((entry) => {
    if (!entry.status) {
      entry.status = 'Pending'
    }
  })
  currentTraveler.allDestinations.forEach((destination, index) => {
      if (destination.status === 'Pending') {
        tripCardContainer.innerHTML += domUpdates.renderTripCardsWithDestinationInfo(destination, currentTraveler.allTrips[index]);
      }
    })
  }
    
pendingTripsBtn.addEventListener('click', filterPendingTrips)

const filterApprovedTrips = () => {
  tripCardContainer.innerHTML = '';
  currentTraveler.allDestinations.forEach((destination, index) => {
      if (destination.status === 'Approved') {
        tripCardContainer.innerHTML += domUpdates.renderTripCardsWithDestinationInfo(destination, currentTraveler.allTrips[index]);
      }
    })
  }
    
approvedTripsBtn.addEventListener('click', filterApprovedTrips)

const showAllTrips = () => {
  tripCardContainer.innerHTML = '';
  currentTraveler.allDestinations.forEach((destination, index) => {
    if (destination.status === 'Approved' || destination.status === 'Pending') {
      tripCardContainer.innerHTML += domUpdates.renderTripCardsWithDestinationInfo(destination, currentTraveler.allTrips[index] );
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




