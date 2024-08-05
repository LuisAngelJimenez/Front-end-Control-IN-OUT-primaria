import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminprofilePage } from './adminprofile.page';

describe('AdminprofilePage', () => {
  let component: AdminprofilePage;
  let fixture: ComponentFixture<AdminprofilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
