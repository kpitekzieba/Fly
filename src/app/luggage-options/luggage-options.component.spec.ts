import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuggageOptionsComponent } from './luggage-options.component';

describe('LuggageOptionsComponent', () => {
  let component: LuggageOptionsComponent;
  let fixture: ComponentFixture<LuggageOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuggageOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuggageOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
