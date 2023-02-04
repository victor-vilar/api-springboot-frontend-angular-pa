import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMenuComponent } from './crud-menu.component';

describe('CrudMenuComponent', () => {
  let component: CrudMenuComponent;
  let fixture: ComponentFixture<CrudMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
