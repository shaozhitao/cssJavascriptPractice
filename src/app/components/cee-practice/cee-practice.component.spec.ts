import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeePracticeComponent } from './cee-practice.component';

describe('CeePracticeComponent', () => {
  let component: CeePracticeComponent;
  let fixture: ComponentFixture<CeePracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CeePracticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CeePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
