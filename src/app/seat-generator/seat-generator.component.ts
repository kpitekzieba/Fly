import { Component, Input, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-seat-generator',
  templateUrl: './seat-generator.component.html',
  styleUrls: ['./seat-generator.component.scss'],
})
export class SeatGeneratorComponent implements OnInit {
  @ViewChild('myElement', { static: false }) myElement!: ElementRef;

  @Input() numberOfSeats: number = 0;
  @Input() seatsAmount: number = 0;
  selectedSeats: string[] = [];
  disabledSeats: string[] = [];

  constructor(private flightService: FlightServiceService) {}

  ngOnInit(): void {
    this.generateDisabledSeats();
  }

  ngAfterViewInit(): void {
    this.setElementHeight();
  }

  setElementHeight(): void {
    const element = this.myElement.nativeElement;

    const planeType = this.flightService.getPlaneType();

    let imageUrl = '';
    if (planeType === 'small') {
      imageUrl = '../../assets/plane_small.png';
    } else if (planeType === 'medium') {
      imageUrl = '../../assets/plane_medium.png';
    } else {
      imageUrl = '../../assets/plane_big.png';
    }

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      const imageHeight = image.height / 4;
      element.style.height = imageHeight + 'px';
      element.style.backgroundImage = `url(${imageUrl})`;
    };
  }

  generateSeatGrid(): { seat: string; disabled: boolean }[] {
    const rows = Math.ceil(this.numberOfSeats / 4);
    const letters = ['A', 'B', 'C', 'D'];
    const seatGrid: { seat: string; disabled: boolean }[] = [];

    let seatNumber = 1;
    for (let row = 1; row <= rows; row++) {
      for (let i = 0; i < letters.length; i++) {
        if (seatNumber > this.numberOfSeats) {
          break;
        }

        const seat = `${row}${letters[i]}`;
        const disabled = this.disabledSeats.includes(seat);
        seatGrid.push({ seat, disabled });
        seatNumber++;
      }
    }

    return seatGrid;
  }

  generateDisabledSeats(): void {
    const totalSeats = this.numberOfSeats;
    const disableCount = Math.floor(totalSeats / 4);

    const allSeats = this.generateSeatGrid();
    const randomIndexes = this.getRandomIndexes(disableCount, totalSeats);

    for (const index of randomIndexes) {
      this.disabledSeats.push(allSeats[index].seat);
    }
  }

  getRandomIndexes(count: number, totalSeats: number): number[] {
    const indexes: number[] = [];
    const allIndexes = Array.from({ length: totalSeats }, (_, index) => index);

    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * allIndexes.length);
      indexes.push(allIndexes.splice(randomIndex, 1)[0]);
    }

    return indexes;
  }

  selectSeat(seat: string): void {
    if (this.disabledSeats.includes(seat)) {
      return;
    }

    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter(
        (selectedSeat) => selectedSeat !== seat
      );
    } else if (this.selectedSeats.length < this.seatsAmount) {
      this.selectedSeats.push(seat);
    }

    this.flightService.setSelectedSeats(this.selectedSeats);
  }

  isSelected(seat: string): boolean {
    return this.selectedSeats.includes(seat);
  }

  isDisabled(seat: string): boolean {
    return this.disabledSeats.includes(seat);
  }
}
