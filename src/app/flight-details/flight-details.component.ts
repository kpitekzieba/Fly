import { Component, OnInit } from '@angular/core';
import { FlightServiceService } from '../flight-service.service';
import { Flight } from '../flight.interface';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.scss'],
})
export class FlightDetailsComponent implements OnInit {
  username: string = '';
  selectedFlight: Flight | null = null;
  numberOfSeats: number = 0;
  seatsAmount: number = 0;
  showModal: boolean = false;
  planes: any[] = [];
  seatGrid: string[] = [];
  hasSelectedSeats: boolean = false;
  planeType: string = '';
  planeName: string = '';
  planesSeatAmount: number = 0;

  constructor(
    private flightService: FlightServiceService,
    private http: HttpClient,
  ) {
    this.username = this.flightService.getUsername();
    this.selectedFlight = this.flightService.selectedFlight;
    this.seatsAmount = flightService.selectedSeatsAmount;
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  loginSuccessful(): void {
    this.flightService.loggedInUser = this.username;
    this.flightService.setUsername(this.username);
    this.showModal = false;
  }

  logout(): void {
    this.flightService.loggedInUser = null;
    this.showModal = true;
  }

  ngOnInit(): void {
    const isLoggedIn = this.flightService.isLoggedIn();
    this.showModal = !isLoggedIn;
  
    this.http.get<any[]>('/assets/planes.json').subscribe((planes) => {
      this.planes = planes;
  
      const departureContinent = this.selectedFlight?.departure.continent;
      const arrivalContinent = this.selectedFlight?.arrival.continent;
      const departureCountry = this.selectedFlight?.departure.country;
      const arrivalCountry = this.selectedFlight?.arrival.country;
  
      let selectedPlane: any;
      let price: number;
  
      if (departureContinent !== arrivalContinent) {
        selectedPlane = this.planes.find((plane) => plane.planeType === 'big');
        price = generateRandomPrice(3000, 5000);
      } else if (departureCountry !== arrivalCountry) {
        selectedPlane = this.planes.find((plane) => plane.planeType === 'medium');
        price = generateRandomPrice(1500, 2500);
      } else {
        selectedPlane = this.planes.find((plane) => plane.planeType === 'small');
        price = generateRandomPrice(500, 1000);
      }

      this.planeName = selectedPlane.planeName;
      this.planesSeatAmount = selectedPlane.numberOfSeats;
  
     
      this.flightService.setPrice(price);
      this.numberOfSeats = selectedPlane.numberOfSeats;
      this.flightService.setPlaneType(selectedPlane.planeType);

    });
  }
  checkSelectedSeats(): void {
    const selectedSeats = this.flightService.getSelectedSeats();
    this.hasSelectedSeats = selectedSeats.length == this.seatsAmount;

  }
  
 
  
  
}

function generateRandomPrice(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
