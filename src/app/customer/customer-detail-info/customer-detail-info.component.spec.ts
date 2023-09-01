import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailInfoComponent } from './customer-detail-info.component';

describe('CustomerDetailInfoComponent', () => {
  let component: CustomerDetailInfoComponent;
  let fixture: ComponentFixture<CustomerDetailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerDetailInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
