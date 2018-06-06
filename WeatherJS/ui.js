class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.icon = document.getElementById('w-icon');
    this.details = document.getElementById('w-details');
    this.humidity = document.getElementById('w-humidity');
    this.dewpoint = document.getElementById('w-dewpoint');
    this.feelsLike = document.getElementById('w-feels-like');
    this.wind = document.getElementById('w-wind');
  }

  // Paint the UI with the results of the API call
  paint(weather) {
    this.location.textContent = weather.display_location.full;
    this.desc.textContent = weather.weather;
    this.string.textContent = weather.temperature_string;
    this.icon.setAttribute('src', weather.icon_url);
    this.humidity.textContent = `Relative humidity: ${
      weather.relative_humidity
    }`;
    this.feelsLike.textContent = `Feels like: ${weather.feelslike_string}`;
    this.dewpoint.textContent = `DewPoint: ${weather.dewpoint_string}`;
    this.wind.textContent = `Wind: ${weather.wind_string}`;
  }
}

// AccuWeather usa 2 requests, uno para la location que te devuleve una key (Uribelarrea: 7870) y el segundo que funciona segun la locationKey (current conditions, weather alarm, forecast, alerts, etc...)
