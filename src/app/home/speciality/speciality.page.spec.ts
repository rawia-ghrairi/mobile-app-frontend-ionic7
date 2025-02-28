import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpecialityPage } from './speciality.page';

describe('SpecialityPage', () => {
  let component: SpecialityPage;
  let fixture: ComponentFixture<SpecialityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
