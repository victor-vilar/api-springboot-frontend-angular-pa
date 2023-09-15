import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractsComponentListPerCustomer } from './customer-contracts-list-per-customer.component';

describe('CustomerContractsComponent', () => {
  let component: CustomerContractsComponentListPerCustomer;
  let fixture: ComponentFixture<CustomerContractsComponentListPerCustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractsComponentListPerCustomer ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContractsComponentListPerCustomer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
