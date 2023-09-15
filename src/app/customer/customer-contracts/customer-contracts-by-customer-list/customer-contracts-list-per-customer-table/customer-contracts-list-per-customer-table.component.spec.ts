import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractsByCustomerListTableComponent } from './customer-contracts-list-per-customer-table.component';

describe('CustomerContractsListTableComponent', () => {
  let component: CustomerContractsByCustomerListTableComponent;
  let fixture: ComponentFixture<CustomerContractsByCustomerListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractsByCustomerListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContractsByCustomerListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
