import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsaumeModalComponent } from './psaume-modal.component';

describe('PsaumeModalComponent', () => {
  let component: PsaumeModalComponent;
  let fixture: ComponentFixture<PsaumeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsaumeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PsaumeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
