import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
  // Movies as default view inside the navigation component
  { path: 'movies', component: NavigationComponent }

];

@NgModule({
  // Creates in-app navigation using the routes defined above
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
