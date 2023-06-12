import { Component, OnInit } from '@angular/core';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-flight-start',
  templateUrl: './flight-start.component.html',
  styleUrls: ['./flight-start.component.scss'],
})
export class FlightStartComponent implements OnInit {
  selectedDate: string = '';
  selectedCity: string = '';
  showSearchResult: boolean = false;
  flights: any[] = [];


  constructor(public flightService: FlightServiceService) {}

  ngOnInit(): void {

  }

 


}
