import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  weatherTemp: any;
  weatherDescription: any;
  weatherIcon: any;
  weatherCity: any;
  location!: {
    latitude: number,
    longitude: number
  };
  constructor(private http: HttpClient) {
    this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };
        this.getWeatherData();
      }, (error) => {
        this.location = {
          latitude: 52.2319581,
          longitude: 21.0067249
        };
        this.getWeatherData();
      });
    } else {
      this.location = {
        latitude: 52.2319581,
        longitude: 21.0067249
      };
      this.getWeatherData();
    }
  }

  getWeatherData() {
    const apiKey = '1282f6acf6f17b47934dd3c1e006988a';
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.location.latitude}&lon=${this.location.longitude}&lang=pl&appid=${apiKey}&units=metric`;

    this.http.get(apiUrl).subscribe((data: any) => {
      this.weatherCity = data.name;
      this.weatherTemp = data.main.temp;
      this.weatherTemp = Math.round(data.main.temp);
      this.weatherIcon = data.weather[0].icon;
      this.weatherDescription = data.weather[0].description;
    });
  }

  ngOnInit(): void {
  }

}
