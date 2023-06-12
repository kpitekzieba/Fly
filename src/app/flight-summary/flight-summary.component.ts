import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightServiceService } from '../flight-service.service';
import { Flight } from '../flight.interface';

@Component({
  selector: 'app-flight-summary',
  templateUrl: './flight-summary.component.html',
  styleUrls: ['./flight-summary.component.scss'],
})
export class FlightSummaryComponent implements OnInit {
  selectedFlight: Flight | null = null;
  selectedSeatOptions: { seat: string; option: string }[] = [];
  price: number = 0;
  selectedCurrency: string = 'PLN';
  currencyData: any;
  usdRate: number = 0;
  eurRate: number = 0;

  constructor(
    private flightService: FlightServiceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.selectedSeatOptions = this.flightService.getSeatOptions();
    this.price = this.flightService.getPrice();
    this.selectedFlight = this.flightService.selectedFlight;

    this.fetchCurrencyData();
  }



  fetchCurrencyData(): void {
    this.http.get('http://www.floatrates.com/daily/pln.json')
      .subscribe({
        next: (data: any) => {
          this.usdRate = data.usd.rate;
          this.eurRate = data.eur.rate;
        },
        error: (error: any) => {
          console.error('Failed to fetch currency data', error);
        }
      });
  }

  getConvertedPrice(price: number): number {
    switch (this.selectedCurrency) {
      case 'PLN':
        return price;
      case 'USD':
        return price * this.usdRate;
      case 'EUR':
        return price * this.eurRate;
      default:
        return price;
    }
  }

  getPriceForSeat(seatOption: { seat: string; option: string }): number {
    const basePrice = this.getConvertedPrice(this.price);

 
      return basePrice;
    
  }

  getPriceForLuggage(option: string): number {
    switch (option) {
      case 'Podręczny':
        return this.getConvertedPrice(0);
      case 'Podręczny i rejestrowany':
        return this.getConvertedPrice(50);
      case 'Podręczny i rejestrowany(duży)':
        return this.getConvertedPrice(100);
      default:
        return this.getConvertedPrice(0);
    }
  }

  getPriceForSeatWithLuggage(seatOption: {
    seat: string;
    option: string;
  }): number {
    const seatPrice = this.getPriceForSeat(seatOption);
    const luggagePrice = this.getPriceForLuggage(seatOption.option);

    return seatPrice + luggagePrice;
  }

  getTotalPrice(): number {
    let totalPrice = 0;

    for (const seatOption of this.selectedSeatOptions) {
      totalPrice += this.getPriceForSeatWithLuggage(seatOption);
    }

    return totalPrice;
  }
}
