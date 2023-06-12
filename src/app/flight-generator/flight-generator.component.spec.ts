import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightGeneratorComponent } from './flight-generator.component';

describe('FlightGeneratorComponent', () => {
  let component: FlightGeneratorComponent;
  let fixture: ComponentFixture<FlightGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlightGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
