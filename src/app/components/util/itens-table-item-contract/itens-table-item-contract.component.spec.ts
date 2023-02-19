import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensTableItemContractComponent } from './itens-table-item-contract.component';

describe('ItensTableItemContractComponent', () => {
  let component: ItensTableItemContractComponent;
  let fixture: ComponentFixture<ItensTableItemContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensTableItemContractComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensTableItemContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
