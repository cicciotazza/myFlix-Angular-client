import { Component, OnInit } from '@angular/core';
// breakpoint components used to make the view responsive by allowing the state of elements relative to breakpoints to be checked
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  // isHandset variable sets using the observe method on the BreakpointObserver to identify when the screen size has changed to mobile
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  // componentDisplayed value that ngSwitch uses to determine which view to display as side-nav content. The default view is movies
  componentDisplayed: String = 'movies';

  // BreakpointObserver added as a property so that use its methods to implement breakpoint monitoring and thereby change the layout for different screen sizes
  constructor(
    private breakpointObserver: BreakpointObserver,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  // Updates the value of componentDisplayed based on the nav item selected by the user, thereby changing the view
  changeComponentDisplayed(name: string): void { this.componentDisplayed = name }

  // Logs out the user
  logout(): void {
    // Clears the local storage so the logged out user can no longer access protected routes
    localStorage.clear();
    this.snackBar.open("Logged out. Goodbye!", 'X', { duration: 4000, panelClass: 'snack-style' });
    // Navigates back to the welcome page so the user must log in again
    this.router.navigate(['welcome']);
  }
}