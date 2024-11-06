import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInscriptionsComponent } from './profile-inscriptions.component';

describe('ProfileInscriptionsComponent', () => {
  let component: ProfileInscriptionsComponent;
  let fixture: ComponentFixture<ProfileInscriptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileInscriptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileInscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
