import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { EventItemComponent } from './event-item.component';
import { provideRouter } from '@angular/router';
import { routes } from 'src/app/app.routes';
import { AppTestingModule } from 'src/app/testing/app-testing.module';

describe('EventItemComponent', () => {
  let component: EventItemComponent;
  let fixture: ComponentFixture<EventItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EventItemComponent, AppTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventItemComponent);
    component = fixture.componentInstance;
    component.event = {
      id: '1',
      title: 'Test title',
      subtitle: 'Test subtitle'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
