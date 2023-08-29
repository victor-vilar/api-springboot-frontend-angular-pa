import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentListTableComponent } from './equipment-list-table.component';

describe('EquipmentListTableComponent', () => {
  let component: EquipmentListTableComponent;
  let fixture: ComponentFixture<EquipmentListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
