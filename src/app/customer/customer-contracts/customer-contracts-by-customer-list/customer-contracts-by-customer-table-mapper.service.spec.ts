import { TestBed } from '@angular/core/testing';

import { CustomerContractsByCustomerTableMapperService } from './customer-contracts-by-customer-table-mapper.service';

describe('CustomerContractsByCustomerTableMapperService', () => {
  let service: CustomerContractsByCustomerTableMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerContractsByCustomerTableMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
