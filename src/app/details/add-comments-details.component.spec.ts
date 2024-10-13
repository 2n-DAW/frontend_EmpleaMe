import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentsDetailsComponent } from './add-comments-details.component';

describe('AddCommentsDetailsComponent', () => {
  let component: AddCommentsDetailsComponent;
  let fixture: ComponentFixture<AddCommentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCommentsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCommentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
