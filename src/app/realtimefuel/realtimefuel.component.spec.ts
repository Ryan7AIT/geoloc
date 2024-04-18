import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimefuelComponent } from './realtimefuel.component';

describe('RealtimefuelComponent', () => {
  let component: RealtimefuelComponent;
  let fixture: ComponentFixture<RealtimefuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimefuelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealtimefuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
