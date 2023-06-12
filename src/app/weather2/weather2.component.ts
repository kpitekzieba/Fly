import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-weather2',
  templateUrl: './weather2.component.html',
  styleUrls: ['./weather2.component.scss'],
})
export class WeatherComponent2 implements OnInit {
  weatherTemp: any;
  weatherDescription: any;
  weatherIcon: any;
  weatherCity: any;
  location!: {
    latitude: number;
    longitude: number;
  };
  city!: string;
  constructor(
    private http: HttpClient,
    private flightService: FlightServiceService
  ) {}

  getWeatherData() {
    const apiKey = '1282f6acf6f17b47934dd3c1e006988a';
    const city = this.flightService.selectedFlight?.arrival.city;
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=pl&appid=${apiKey}&units=metric`;
    this.http.get(apiUrl).subscribe((data: any) => {
      this.weatherCity = data.city.name;
      this.weatherTemp = data.list[0].main.temp;
      this.weatherIcon = data.list[0].weather[0].icon;
      this.weatherDescription = data.list[0].weather[0].description;
    });
  }

  ngOnInit(): void {
    this.getWeatherData();
  }
}
