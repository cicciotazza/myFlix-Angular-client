/**
 * The AppRoutingModule is used to create and configure a module containing the providers and 
 * directives required by the Router service for in-app navigation. The app is imported in the 
 * app.module file to make routing available throughout the application.
 * @module AppRoutingModule
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavigationComponent } from './navigation/navigation.component';

/**
 * routes is an array of Route objects that define the navigation paths for the application.
 */
const routes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
  /**
  * Movies is the default view displayed inside the navigation component, hence that is the component
  * specified for the path "movies".
  */
  { path: 'movies', component: NavigationComponent }

];

@NgModule({
  /**
   * The forRoot method creates and configures the RouterModule using the routes specified.
   */
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
