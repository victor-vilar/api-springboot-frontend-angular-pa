import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensTableComponent } from './itens-table.component';

describe('ItensTableComponent', () => {
  let component: ItensTableComponent;
  let fixture: ComponentFixture<ItensTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItensTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItensTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
