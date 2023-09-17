import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsListTableComponent } from './contracts-list-table.component';

describe('CustomerContractsListTableComponent', () => {
  let component: ContractsListTableComponent;
  let fixture: ComponentFixture<ContractsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractsListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
