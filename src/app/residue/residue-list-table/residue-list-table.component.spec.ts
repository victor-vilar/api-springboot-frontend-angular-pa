import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidueListTableComponent } from './residue-list-table.component';

describe('ResidueListTableComponent', () => {
  let component: ResidueListTableComponent;
  let fixture: ComponentFixture<ResidueListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidueListTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidueListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
