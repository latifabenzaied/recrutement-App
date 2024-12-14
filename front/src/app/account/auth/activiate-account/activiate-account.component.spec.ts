import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiviateAccountComponent } from './activiate-account.component';

describe('ActiviateAccountComponent', () => {
  let component: ActiviateAccountComponent;
  let fixture: ComponentFixture<ActiviateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiviateAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiviateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
