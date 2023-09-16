import { TestBed } from '@angular/core/testing';

import { CustomerAddressListTableComponentMapperService } from './customer-address-list-table-component-mapper-service.service';

describe('CustomerListTableComponentMapperServiceService', () => {
  let service: CustomerAddressListTableComponentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAddressListTableComponentMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
