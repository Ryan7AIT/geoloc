import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgMaxSpeedChartComponent } from './avg-max-speed-chart.component';

describe('AvgMaxSpeedChartComponent', () => {
  let component: AvgMaxSpeedChartComponent;
  let fixture: ComponentFixture<AvgMaxSpeedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvgMaxSpeedChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvgMaxSpeedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
