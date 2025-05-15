import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedSubmitComponent } from './finished-submit.component';

describe('FinishedSubmitComponent', () => {
  let component: FinishedSubmitComponent;
  let fixture: ComponentFixture<FinishedSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinishedSubmitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FinishedSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
