import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupervisorsDetailComponent } from './customer-supervisors-detail.component';

describe('CustomerSupervisorsDetailComponent', () => {
  let component: CustomerSupervisorsDetailComponent;
  let fixture: ComponentFixture<CustomerSupervisorsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupervisorsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSupervisorsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
