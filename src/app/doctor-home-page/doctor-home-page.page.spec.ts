import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorHomePagePage } from './doctor-home-page.page';

describe('DoctorHomePagePage', () => {
  let component: DoctorHomePagePage;
  let fixture: ComponentFixture<DoctorHomePagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorHomePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
