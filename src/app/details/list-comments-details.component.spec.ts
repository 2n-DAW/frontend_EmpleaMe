import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommentsDetailsComponent } from './list-comments-details.component';

describe('ListCommentsDetailsComponent', () => {
  let component: ListCommentsDetailsComponent;
  let fixture: ComponentFixture<ListCommentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCommentsDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCommentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
