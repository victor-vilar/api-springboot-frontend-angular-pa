import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensTableCustomerComponent } from './customer-list-table.component';

describe('ItensTableCustomerComponent', () => {
  let component: ItensTableCustomerComponent;
  let fixture: ComponentFixture<ItensTableCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensTableCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensTableCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
