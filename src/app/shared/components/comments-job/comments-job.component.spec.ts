import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsJobComponent } from './comments-job.component';

describe('CommentsJobComponent', () => {
  let component: CommentsJobComponent;
  let fixture: ComponentFixture<CommentsJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentsJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentsJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
