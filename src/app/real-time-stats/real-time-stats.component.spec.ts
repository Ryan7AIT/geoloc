import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeStatsComponent } from './real-time-stats.component';

describe('RealTimeStatsComponent', () => {
  let component: RealTimeStatsComponent;
  let fixture: ComponentFixture<RealTimeStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealTimeStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealTimeStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
