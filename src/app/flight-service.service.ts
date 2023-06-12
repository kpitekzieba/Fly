import { Injectable } from '@angular/core';
import { Flight } from './flight.interface';

@Injectable({
  providedIn: 'root',
})
export class FlightServiceService {
  private username: string = '';
  selectedSeatsAmount: number = 0;
  loggedInUser: string | null = null;
  selectedSeats: string[] = []; // Add selectedSeats array
  selectedSeatOptions: { seat: string; option: string }[] = []; // Track selected seat options
  planeType: string = '';
  price : number = 0;

  setPlaneType(planeType: string): void {
    this.planeType = planeType;
  }

  getPlaneType(): string {
    return this.planeType;
  }

  setPrice(price: number): void {
    this.price = price;
  }

  getPrice(): number {
    return this.price;
  }

  setSeatOptions(seatOptions: { seat: string; option: string }[]): void {
    this.selectedSeatOptions = seatOptions;
  }

  getSeatOptions(): { seat: string; option: string }[] {
    return this.selectedSeatOptions;
  }

  
  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  setSelectedSeatsAmount(seatsAmount: number): void {
    this.selectedSeatsAmount = seatsAmount;
  }

  setUsername(username: string) {
    this.username = username;
  }
  
  getUsername() {
    return this.username;
  }

  setSelectedSeats(seats: string[]): void {
    this.selectedSeats = seats;
  }

  getSelectedSeats(): string[] {
    return this.selectedSeats;
  }



  selectedFlight: Flight | null = null;

  constructor() {}
}