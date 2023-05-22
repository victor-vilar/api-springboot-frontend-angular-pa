import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSupervisorsComponent } from './customer-supervisors.component';

describe('CustomerSupervisorsComponent', () => {
  let component: CustomerSupervisorsComponent;
  let fixture: ComponentFixture<CustomerSupervisorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerSupervisorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerSupervisorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
