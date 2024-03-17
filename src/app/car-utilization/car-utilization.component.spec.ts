import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarUtilizationComponent } from './car-utilization.component';

describe('CarUtilizationComponent', () => {
  let component: CarUtilizationComponent;
  let fixture: ComponentFixture<CarUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarUtilizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
