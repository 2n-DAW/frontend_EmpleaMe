import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRangeSliderComponent } from './multi-range-slider.component';

describe('MultiRangeSliderComponent', () => {
  let component: MultiRangeSliderComponent;
  let fixture: ComponentFixture<MultiRangeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiRangeSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiRangeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
