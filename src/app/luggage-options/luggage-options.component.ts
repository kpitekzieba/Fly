import { Component, Input } from '@angular/core';
import { FlightServiceService } from '../flight-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-luggage-options',
  templateUrl: './luggage-options.component.html',
  styleUrls: ['./luggage-options.component.scss'],
})
export class LuggageOptionsComponent {
  @Input() numberOfSeats: number | null = 0;
  luggageOptions: string[] = ['Podręczny', 'Podręczny i rejestrowany', 'Podręczny i rejestrowany(duży)'];
  seatIndexes: number[] = [];
  selectedSeats: string[] = [];
  selectedOptions: { [key: number]: string } = {}; // Track selected options for each seat

  constructor(
    private flightService: FlightServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.numberOfSeats !== null && this.numberOfSeats !== undefined) {
      this.seatIndexes = Array.from({ length: this.numberOfSeats }, (_, index) => index);
      this.selectedSeats = this.flightService.getSelectedSeats();
    }


    for (const seatIndex in this.selectedSeats) {
      this.selectedOptions[seatIndex] = this.luggageOptions[0];
    }
  }

  seatSelected(seatIndex: number): boolean {
    return this.seatIndexes.includes(seatIndex);
  }

  isSelectedOption(seatIndex: number, option: string): boolean {
    return this.selectedOptions[seatIndex] === option;
  }
  

  onSelectLuggageOption(seatIndex: number, option: string): void {
    this.selectedOptions[seatIndex] = option; // Store the selected option for the seat
  }

  saveSeatOptions(): void {
    const seatOptions: { seat: string; option: string }[] = [];
    for (const seatIndex in this.selectedOptions) {
      const seat = this.selectedSeats[seatIndex];
      const option = this.selectedOptions[seatIndex];
      seatOptions.push({ seat, option });
    }
    this.flightService.setSeatOptions(seatOptions); // Save the seat options to the FlightService
    this.router.navigate(['/summary']); // Navigate to the FlightSummaryComponent
  }
}
