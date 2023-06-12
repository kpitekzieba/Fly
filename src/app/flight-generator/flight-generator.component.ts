import { Component, OnInit } from '@angular/core';
import { FlightServiceService } from '../flight-service.service';
import { Flight } from '../flight.interface';
import { Router } from '@angular/router';

interface City {
  city: string;
  country: string;
  continent: string;
}

@Component({
  selector: 'app-flight-generator',
  templateUrl: './flight-generator.component.html',
  styleUrls: ['./flight-generator.component.scss'],
})
export class FlightGeneratorComponent implements OnInit {
  departure: City = { city: '', country: '', continent: '' };
  arrival: City = { city: '', country: '', continent: '' };
  flightDate: string = '';
  seatsAmount: number = 1;


  departureCities: City[] = [
    { city: 'Kraków', country: 'Polska', continent: 'Europa' },
    { city: 'Berlin', country: 'Niemcy', continent: 'Europa' },
    { city: 'Nowy Jork', country: 'Stany Zjednoczone', continent: 'Ameryka Północna' },
  ];
  arrivalCities: City[] = [
    { city: 'Warszawa', country: 'Polska', continent: 'Europa' },
    { city: 'Paryż', country: 'Francja', continent: 'Europa' },
    { city: 'Tokio', country: 'Japonia', continent: 'Azja' },

  ];

  generatedFlights: Flight[] = [];

  constructor(
    private flightService: FlightServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  generateFlights(): void {
    if (this.departure.city && this.arrival.city && this.flightDate) {
      const flights: Flight[] = [];

      const numberOfFlights = Math.floor(Math.random() * 4) + 2;

      for (let i = 0; i < numberOfFlights; i++) {
        const departureTime = this.getRandomTime();
        const arrivalTime = this.getRandomTimeAfter(departureTime);

        const flight: Flight = {
          departure: this.departure,
          arrival: this.arrival,
          date: this.flightDate,
          departureTime: departureTime,
          arrivalTime: arrivalTime,
        };

        flights.push(flight);
      }

      this.generatedFlights = flights;
    }
  }

  private getRandomTime(): string {
    const hours = this.getRandomNumber(0, 16);
    const minutes = this.getRandomNumber(0, 59);

    const formattedHours = this.padNumber(hours, 2);
    const formattedMinutes = this.padNumber(minutes, 2);

    return `${formattedHours}:${formattedMinutes}`;
  }

  private getRandomTimeAfter(minTime: string): string {
    const minHours = Number(minTime.split(':')[0]);
    const minMinutes = Number(minTime.split(':')[1]);

    const minTimeInMinutes = minHours * 60 + minMinutes; 

    const randomMinutes = this.getRandomNumber(120, 300); 
    const totalMinutes = minTimeInMinutes + randomMinutes;

    const hours = Math.floor(totalMinutes / 60); 
    const minutes = totalMinutes % 60; 

    const formattedHours = this.padNumber(hours, 2);
    const formattedMinutes = this.padNumber(minutes, 2);

    return `${formattedHours}:${formattedMinutes}`;
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private padNumber(number: number, length: number): string {
    return number.toString().padStart(length, '0');
  }

  viewFlightDetails(flight: Flight): void {
    this.flightService.selectedFlight = flight;
    this.flightService.setSelectedSeatsAmount(this.seatsAmount);
    this.router.navigate(['/details']);
  }
}
