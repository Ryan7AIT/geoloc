import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarLiveDetailsComponent } from './car-live-details.component';

describe('CarLiveDetailsComponent', () => {
  let component: CarLiveDetailsComponent;
  let fixture: ComponentFixture<CarLiveDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarLiveDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarLiveDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
