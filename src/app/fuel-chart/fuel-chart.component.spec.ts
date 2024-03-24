import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelChartComponent } from './fuel-chart.component';

describe('FuelChartComponent', () => {
  let component: FuelChartComponent;
  let fixture: ComponentFixture<FuelChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuelChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
