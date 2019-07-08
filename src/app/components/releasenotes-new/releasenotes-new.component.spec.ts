import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasenotesNewComponent } from './releasenotes-new.component';

describe('ReleasenotesNewComponent', () => {
  let component: ReleasenotesNewComponent;
  let fixture: ComponentFixture<ReleasenotesNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasenotesNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasenotesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
