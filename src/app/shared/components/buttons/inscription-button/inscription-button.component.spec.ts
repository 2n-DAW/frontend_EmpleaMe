import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionButtonComponent } from './inscription-button.component';

describe('InscriptionButtonComponent', () => {
  let component: InscriptionButtonComponent;
  let fixture: ComponentFixture<InscriptionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
