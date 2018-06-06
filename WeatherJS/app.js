// Init storage
const storage = new Storage();
// Get store location data
const weatherLocation = storage.getLocationData();
// Initialize weather object
const weather = new Weather(weatherLocation.city, weatherLocation.state);
// Init UI
const ui = new UI();

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change location event
document.getElementById('w-change-btn').addEventListener('click', e => {
  const city = document.getElementById('city').value;
  const state = document.getElementById('state').value;

  // Change location
  weather.changeLocation(city, state);

  // Set location in LocalStorage
  storage.setLocationData(city, state);

  // Get and display weather
  getWeather();

  // Close the modal using jquery (bootstrap dependecy)
  $('#locModal').modal('hide');
});

//It's going to return a promise
function getWeather() {
  weather
    .getWeather()
    .then(results => {
      ui.paint(results);
    })
    .catch(err => console.log(err));
}
// console.log(results);
