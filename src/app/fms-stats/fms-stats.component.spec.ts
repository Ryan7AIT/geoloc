import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsStatsComponent } from './fms-stats.component';

describe('FmsStatsComponent', () => {
  let component: FmsStatsComponent;
  let fixture: ComponentFixture<FmsStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FmsStatsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FmsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
