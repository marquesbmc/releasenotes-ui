import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NrNewComponent } from './nr-new.component';

describe('NrNewComponent', () => {
  let component: NrNewComponent;
  let fixture: ComponentFixture<NrNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NrNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NrNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
