import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemContractListTableComponent } from './itemContract-list-table.component';

describe('ItensTableItemContractComponent', () => {
  let component: ItemContractListTableComponent;
  let fixture: ComponentFixture<ItemContractListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemContractListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemContractListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
