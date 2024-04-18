import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiMapComponent } from './bi-map.component';

describe('BiMapComponent', () => {
  let component: BiMapComponent;
  let fixture: ComponentFixture<BiMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
