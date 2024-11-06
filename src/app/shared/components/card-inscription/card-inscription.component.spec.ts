import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInscriptionComponent } from './card-inscription.component';

describe('CardInscriptionComponent', () => {
  let component: CardInscriptionComponent;
  let fixture: ComponentFixture<CardInscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInscriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
