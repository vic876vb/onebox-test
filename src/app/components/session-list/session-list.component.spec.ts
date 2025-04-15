import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionListComponent } from './session-list.component';
import { AppTestingModule } from 'src/app/testing/app-testing.module';
import { ShoppingCartService } from '@services/shopping-cart.service';

describe('SessionListComponent', () => {
  let component: SessionListComponent;
  let fixture: ComponentFixture<SessionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SessionListComponent, AppTestingModule],
      providers: [
        {
          provide: ShoppingCartService,
          useValue: {
            cart: () => ({ items: [] }),
            updateCart: jasmine.createSpy()
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateCart with correct ticket data', () => {
    const service = TestBed.inject(ShoppingCartService);
    component.updateCart(3, '2025-01-01');
    expect(service.updateCart).toHaveBeenCalledWith(
      jasmine.objectContaining({
        ticket: { date: '2025-01-01', quantity: 3 }
      })
    );
  });
});
