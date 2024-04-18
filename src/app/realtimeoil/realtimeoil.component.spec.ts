import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimeoilComponent } from './realtimeoil.component';

describe('RealtimeoilComponent', () => {
  let component: RealtimeoilComponent;
  let fixture: ComponentFixture<RealtimeoilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimeoilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealtimeoilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
