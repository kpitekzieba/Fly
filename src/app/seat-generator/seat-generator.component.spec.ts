import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatGeneratorComponent } from './seat-generator.component';

describe('SeatGeneratorComponent', () => {
  let component: SeatGeneratorComponent;
  let fixture: ComponentFixture<SeatGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
