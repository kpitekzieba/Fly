import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FlightDetailsComponent } from './flight-details/flight-details.component';
import { FlightSummaryComponent } from './flight-summary/flight-summary.component';
import { FlightStartComponent } from './flight-start/flight-start.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { FlightGeneratorComponent } from './flight-generator/flight-generator.component';
import { SeatGeneratorComponent } from './seat-generator/seat-generator.component';
import { LuggageOptionsComponent } from './luggage-options/luggage-options.component';
import { HeaderComponent } from './header/header.component';
import { WeatherComponent2 } from './weather2/weather2.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightDetailsComponent,
    FlightSummaryComponent,
    FlightStartComponent,
    WeatherComponent,
    LoginPopupComponent,
    FlightGeneratorComponent,
    SeatGeneratorComponent,
    LuggageOptionsComponent,
    HeaderComponent,
    WeatherComponent2,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
