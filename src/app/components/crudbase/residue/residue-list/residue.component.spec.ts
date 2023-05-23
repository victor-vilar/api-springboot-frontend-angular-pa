import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidueComponent } from './residue.component';

describe('ResidueComponent', () => {
  let component: ResidueComponent;
  let fixture: ComponentFixture<ResidueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
