import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { forumPageComponent } from './forum-page.component';

describe('forumPageComponent', () => {
  let component: forumPageComponent;
  let fixture: ComponentFixture<forumPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ forumPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(forumPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
