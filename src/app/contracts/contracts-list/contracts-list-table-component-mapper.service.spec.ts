import { TestBed } from '@angular/core/testing';

import { ContractsListTableComponentMapperService } from './contracts-list-table-component-mapper.service';

describe('ContractsListTableComponentMapperService', () => {
  let service: ContractsListTableComponentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractsListTableComponentMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
