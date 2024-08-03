import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterkidsPage } from './registerkids.page';

describe('RegisterkidsPage', () => {
  let component: RegisterkidsPage;
  let fixture: ComponentFixture<RegisterkidsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterkidsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
