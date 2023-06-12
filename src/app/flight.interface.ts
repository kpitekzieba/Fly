export interface Flight {
  departure: CityInfo;
  arrival: CityInfo;
  date: string;
  departureTime: string;
  arrivalTime: string;
}

export interface CityInfo {
  city: string;
  country: string;
  continent: string;
}