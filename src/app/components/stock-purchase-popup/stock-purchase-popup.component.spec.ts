import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPurchasePopupComponent } from './stock-purchase-popup.component';

describe('StockPurchasePopupComponent', () => {
  let component: StockPurchasePopupComponent;
  let fixture: ComponentFixture<StockPurchasePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPurchasePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockPurchasePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
