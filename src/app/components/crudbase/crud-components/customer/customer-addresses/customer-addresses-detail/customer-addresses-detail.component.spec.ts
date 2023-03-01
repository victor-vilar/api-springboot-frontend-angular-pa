import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressesDetailComponent } from './customer-addresses-detail.component';

describe('CustomerAddressesDetailComponent', () => {
  let component: CustomerAddressesDetailComponent;
  let fixture: ComponentFixture<CustomerAddressesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddressesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddressesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
