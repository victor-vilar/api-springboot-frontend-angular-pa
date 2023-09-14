import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractsListPerCustomerTableComponent } from './customer-contracts-list-per-customer-table.component';

describe('CustomerContractsListTableComponent', () => {
  let component: CustomerContractsListPerCustomerTableComponent;
  let fixture: ComponentFixture<CustomerContractsListPerCustomerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractsListPerCustomerTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContractsListPerCustomerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
