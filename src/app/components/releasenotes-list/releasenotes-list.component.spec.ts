import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasenotesListComponent } from './releasenotes-list.component';

describe('ReleasenotesListComponent', () => {
  let component: ReleasenotesListComponent;
  let fixture: ComponentFixture<ReleasenotesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasenotesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasenotesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
