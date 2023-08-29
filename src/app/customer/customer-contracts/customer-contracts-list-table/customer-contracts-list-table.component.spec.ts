import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractsListTableComponent } from './customer-contracts-list-table.component';

describe('CustomerContractsListTableComponent', () => {
  let component: CustomerContractsListTableComponent;
  let fixture: ComponentFixture<CustomerContractsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractsListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContractsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
