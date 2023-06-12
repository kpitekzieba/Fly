import { Component, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentDate!: string;
  subscription!: Subscription;
  constructor() { }

  ngOnInit(): void {
    this.updateDateTime(); 

    this.subscription = interval(1000).subscribe(() => {
      this.updateDateTime();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  updateDateTime() {
    this.currentDate = new Date().toLocaleString();
  }
}
