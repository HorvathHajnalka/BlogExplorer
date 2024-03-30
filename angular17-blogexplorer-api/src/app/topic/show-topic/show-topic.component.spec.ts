import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTopicComponent } from './show-topic.component';

describe('ShowTopicComponent', () => {
  let component: ShowTopicComponent;
  let fixture: ComponentFixture<ShowTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTopicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
