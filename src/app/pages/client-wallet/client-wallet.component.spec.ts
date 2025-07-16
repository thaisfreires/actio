import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientWalletComponent } from './client-wallet.component';

describe('ClientWalletComponent', () => {
  let component: ClientWalletComponent;
  let fixture: ComponentFixture<ClientWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientWalletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
