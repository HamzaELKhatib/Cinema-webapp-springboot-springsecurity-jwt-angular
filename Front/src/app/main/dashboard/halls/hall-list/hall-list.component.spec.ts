import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallListComponent } from './hall-list.component';

describe('ArtistListComponent', () => {
  let component: HallListComponent;
  let fixture: ComponentFixture<HallListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HallListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
