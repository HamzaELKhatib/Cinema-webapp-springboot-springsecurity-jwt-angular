import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectionEditComponent } from './projection-edit.component';

describe('ArtistEditComponent', () => {
  let component: ProjectionEditComponent;
  let fixture: ComponentFixture<ProjectionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectionEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
