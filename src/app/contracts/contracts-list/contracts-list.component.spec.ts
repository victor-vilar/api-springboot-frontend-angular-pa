import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsListComponent } from './contracts-list.component';

describe('CustomerContractsListComponent', () => {
  let component: ContractsListComponent;
  let fixture: ComponentFixture<ContractsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
