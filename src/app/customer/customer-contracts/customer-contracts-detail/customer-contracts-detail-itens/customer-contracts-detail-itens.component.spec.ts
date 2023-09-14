import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerContractsDetailItensComponent } from './customer-contracts-detail-itens.component';

describe('CustomerContractsDetailItensComponent', () => {
  let component: CustomerContractsDetailItensComponent;
  let fixture: ComponentFixture<CustomerContractsDetailItensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerContractsDetailItensComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerContractsDetailItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
