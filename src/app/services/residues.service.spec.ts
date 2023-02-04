import { TestBed } from '@angular/core/testing';

import { ResiduesService } from './residues.service';

describe('ResiduesService', () => {
  let service: ResiduesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResiduesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
