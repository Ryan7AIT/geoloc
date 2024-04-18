import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimebatteryComponent } from './realtimebattery.component';

describe('RealtimebatteryComponent', () => {
  let component: RealtimebatteryComponent;
  let fixture: ComponentFixture<RealtimebatteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimebatteryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealtimebatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
