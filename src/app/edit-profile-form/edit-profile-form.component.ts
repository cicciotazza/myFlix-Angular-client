import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Used to create a reference to the dialog that we opened in the profile component so we can close it when the edit profile form has been successfully submitted
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.scss']
})
export class EditProfileFormComponent implements OnInit {
  // profileData values will be populated by using the ngModel directive on the form inputs in the edit-profile-form template
  profileData = { userName: '', password: '', email: '', Birthday: '' };
  // Needed to access the Api endpoint for updating a user
  userName = localStorage.getItem('userName');

  constructor( // Passing these parameters sets them as properties on the class so we can access them
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditProfileFormComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { }
  updateProfile(): void {
    // "username!" removes the typescript error relating to the fact that username could be null
    this.fetchApiData.updateUser(this.userName!, this.profileData).subscribe((result) => {
      this.dialogRef.close(); // Closes the dialog
      // Reset the username in case the user changed it when updating the profile, cause we use it for some Api endpoints
      localStorage.setItem('userName', this.profileData.userName);
      // unhash password saved to local storage for the profile page, reset this now in case the user changed it
      localStorage.setItem('password', this.profileData.password);
      // Message pops up to confirm that profile has been updated successfully
      this.snackBar.open('Details updated!', 'Ok!', { duration: 4000 });
      // Transition back to the movies view is smooth with enough time for the snackbar to be displayed
      setTimeout(this.redirectToMovies, 4000);
    }, (result) => {
      console.log(result);
      this.snackBar.open("Sorry, it didn't work. Please check all the fields and try again", 'Ok', {
        duration: 4000
      });
    });
  }

  // Redirects the user to the movies view after profile updated their 
  redirectToMovies(): void {
    // Refresh the page to get the default navigation route that contains the movie view
    window.open('/movies', '_self');
  }
}