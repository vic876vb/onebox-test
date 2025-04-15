import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@components/header/header.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public canNavigate: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      const currentRoute = this.router.routerState.root;
      let route = currentRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      this.canNavigate = route.snapshot.data['canNavigate'] === true;
    });
  }

  public back(): void {
    this.router.navigate(['..']);
  }
}
