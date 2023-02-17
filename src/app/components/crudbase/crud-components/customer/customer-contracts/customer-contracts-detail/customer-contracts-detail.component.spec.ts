import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractsDetailComponent } from './customer-contracts-detail.component';

describe('CustomerContractsDetailComponent', () => {
  let component: CustomerContractsDetailComponent;
  let fixture: ComponentFixture<CustomerContractsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContractsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
