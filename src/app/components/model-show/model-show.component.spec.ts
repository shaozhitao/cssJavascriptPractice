import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelShowComponent } from './model-show.component';

describe('ModelShowComponent', () => {
  let component: ModelShowComponent;
  let fixture: ComponentFixture<ModelShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
