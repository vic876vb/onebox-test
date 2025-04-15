import { TestBed, inject } from '@angular/core/testing';
import { EventsService } from './events.service';
import { AppTestingModule } from 'src/app/testing/app-testing.module';

describe('Service: Events', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppTestingModule],
      providers: [EventsService]
    });
  });

  it('should ...', inject([EventsService], (service: EventsService) => {
    expect(service).toBeTruthy();
  }));
});
