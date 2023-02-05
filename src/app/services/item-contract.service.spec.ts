import { TestBed } from '@angular/core/testing';

import { ItemContractService } from './item-contract.service';

describe('ItemContractService', () => {
  let service: ItemContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
