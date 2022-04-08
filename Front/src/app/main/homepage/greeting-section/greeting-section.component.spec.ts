import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingSectionComponent } from './greeting-section.component';

describe('GreetingSectionComponent', () => {
  let component: GreetingSectionComponent;
  let fixture: ComponentFixture<GreetingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GreetingSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GreetingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
