import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddressesListTableComponent } from './customer-addresses-list-table.component';

describe('CustomerAddressListTableComponent', () => {
  let component: CustomerAddressesListTableComponent;
  let fixture: ComponentFixture<CustomerAddressesListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerAddressesListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerAddressesListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
