import { TestBed } from '@angular/core/testing';

import { CustomerSupervisorsListTableComponentMapperService } from './customer-supervisors-list-table-component-mapper.service';

describe('CustomerSupervisorsListTableComponentMapperService', () => {
  let service: CustomerSupervisorsListTableComponentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerSupervisorsListTableComponentMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
