import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupervisorsListTableComponent } from './customer-supervisors-list-table.component';

describe('CustomerSupervisorsListTableComponent', () => {
  let component: CustomerSupervisorsListTableComponent;
  let fixture: ComponentFixture<CustomerSupervisorsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupervisorsListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSupervisorsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
