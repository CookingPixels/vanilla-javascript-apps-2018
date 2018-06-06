// API Key WUnderground City Weather Report brad@techguywebsolutions.com
// 99dfe35fcb7de1ee
// Example: http://api.wunderground.com/api/99dfe35fcb7de1ee/conditions/q/CA/San_Francisco.json

class Weather {
  constructor(city, state) {
    this.apiKey = '99dfe35fcb7de1ee';
    this.city = city;
    this.state = state;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(
      `http://api.wunderground.com/api/${this.apiKey}/conditions/q/${
        this.state
      }/${this.city}.json`
    );

    const responseData = await response.json();

    // Return the object (using the name defined in the API)
    return responseData.current_observation;
  }

  // Change weather location
  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}

// API Key AccuWeather for WeatherNerolasApp
// gM9Olsb6pHsgZqkJcX4nu0hrgTMAmLi6
