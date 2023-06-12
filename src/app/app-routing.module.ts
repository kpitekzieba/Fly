import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightStartComponent } from './flight-start/flight-start.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightSummaryComponent } from './flight-summary/flight-summary.component';

const routes: Routes = [
  { path: '', component: FlightStartComponent },
  { path: 'details', component: FlightDetailsComponent },
  { path: 'summary', component: FlightSummaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
