import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCreateJobComponent } from './profile-create-job.component';

describe('ProfileCreateJobComponent', () => {
  let component: ProfileCreateJobComponent;
  let fixture: ComponentFixture<ProfileCreateJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCreateJobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCreateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
