import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundBubblesComponent } from './background-bubbles.component';

describe('BackgroundBubblesComponent', () => {
  let component: BackgroundBubblesComponent;
  let fixture: ComponentFixture<BackgroundBubblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackgroundBubblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
