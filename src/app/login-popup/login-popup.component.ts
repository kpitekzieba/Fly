import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FlightServiceService } from '../flight-service.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent implements OnInit {
  @Output() loggedIn: EventEmitter<void> = new EventEmitter<void>();
  username: string = '';
  password: string = '';
  showModal: boolean = false;
  error: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private flightService: FlightServiceService
  ) {}

  ngOnInit(): void {}

  toggleModal() {
    this.showModal = !this.showModal;
  }

  login(): void {
    this.http.get<any[]>('/assets/users.json').subscribe((users) => {
      const user = users.find((u) => u.username === this.username && u.password === this.password);
      if (user) {
        this.loggedIn.emit();
        this.flightService.loggedInUser = this.username;
        this.flightService.setUsername(this.username); 
      } else {
        this.error = 'Zła nazwa użytkowika lub hasło.';
      }
    });
  }

  resetForm() {
    this.username = '';
    this.password = '';
  }
}