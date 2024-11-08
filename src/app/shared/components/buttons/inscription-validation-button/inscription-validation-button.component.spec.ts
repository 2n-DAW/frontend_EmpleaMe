import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionValidationButtonComponent } from './inscription-validation-button.component';

describe('InscriptionValidationButtonComponent', () => {
  let component: InscriptionValidationButtonComponent;
  let fixture: ComponentFixture<InscriptionValidationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionValidationButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionValidationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
