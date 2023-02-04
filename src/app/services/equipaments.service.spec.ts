import { TestBed } from '@angular/core/testing';

import { EquipamentsService } from './equipaments.service';

describe('EquipamentsService', () => {
  let service: EquipamentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipamentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
