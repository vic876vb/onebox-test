import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionItemComponent } from './session-item.component';
import { ShoppingCartService } from '@services/shopping-cart.service';

describe('SessionItemComponent', () => {
  let component: SessionItemComponent;
  let fixture: ComponentFixture<SessionItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SessionItemComponent]
      // providers: [
      //   {
      //     provide: ShoppingCartService,
      //     useValue: {
      //       cart: () => ({ items: [] })
      //     }
      //   }
      // ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionItemComponent);
    component = fixture.componentInstance;
    component.session = { date: '2025-01-01', availability: 2 };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
