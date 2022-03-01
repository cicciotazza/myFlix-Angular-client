/** 
 * ProfileComponent renders a mat card displaying the user's profile details. This includes
 * two action buttons to edit their profile and deregister from the app.
 * @module ProfileComponent
 */

import { Component, OnInit } from '@angular/core';
// it accesses the getUser function created on this service
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
// it navigats the user back to the welcome page on successful deregistration
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  // Create a user variable that is an empty object
  user: any = { }; 
  // userName needed to make the requests to the Api endpoints
  userName = localStorage.getItem('user'); 
  // Display an unhashed password to the user and retrieve it from local storage
  password = localStorage.getItem('password'); 
  
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

   /**
   * Calls the getProfile method as soon as the component loads so that the data can be used to populate
   * the template.
   */
  ngOnInit(): void { this.getProfile() } 

   /** 
   * Invokes the getUser method on the fetchApiData service and populates the user object with
   * the response. 
   */ 
  getProfile(): void {
    this.fetchApiData.getUser(this.userName!).subscribe((resp: any) => { this.user = resp });
  }

   /**
   * Opens a dialog containing the edit-profile-form component that renders the edit profile form.
   */ 
  openEditProfileFormDialog(): void {
    this.dialog.open(EditProfileFormComponent, { width: '280px' });
  }

  /** 
   * Invokes the deleteUser method on the fetchApiData service to deregister the user. If deregistration
   * is successful the local storage is cleared, a popup confirms that the profile has been removed and
   * the user is routed back to the welcome page. If unsuccessful, a popup message asks the user to 
   * try again.
   */  deleteProfile(): void {
    this.fetchApiData.deleteUser(this.userName!).subscribe(() => {
      // Clears the local storage so the deregistered user can no longer access protected routes
      localStorage.clear(); 
      this.snackBar.open('Profile removed!', 'X', { duration: 4000, panelClass: 'snack-style' });
      // back to the welcome page
      this.router.navigate(['welcome']); 
    }, (result) => {
       console.log(result);
       this.snackBar.open("There is a problem while deleting your profile. Please try again", 'Ok', { duration: 4000, panelClass: 'snack-style' });
    });
  }

}