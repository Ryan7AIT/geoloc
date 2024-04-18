import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealtimespeedComponent } from './realtimespeed.component';

describe('RealtimespeedComponent', () => {
  let component: RealtimespeedComponent;
  let fixture: ComponentFixture<RealtimespeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealtimespeedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RealtimespeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
