import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountClosurePopupComponent } from './account-closure-popup.component';

describe('AccountClosurePopupComponent', () => {
  let component: AccountClosurePopupComponent;
  let fixture: ComponentFixture<AccountClosurePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountClosurePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountClosurePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
