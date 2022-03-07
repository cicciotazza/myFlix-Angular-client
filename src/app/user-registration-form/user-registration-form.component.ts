/** 
 * The UserRegistrationFormComponent is used to render a mat dialog containing a form where the
 * user can complete and submit a profile to register for myFlix. 
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit } from '@angular/core';
// To create a reference to the dialog opened in the welcome-page component, so can be closed if the registration is successful
import { MatDialogRef } from '@angular/material/dialog';
// To access the userRegistration function created on this service
import { FetchApiDataService } from '../fetch-api-data.service';
// To create pop-up notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
  // userData  takes values by using the ngModel directive on form inputs in the user-registration template
  userData = { userName: '', password: '', email: '', Birthday: '' };

  // Pass the classes as parameters to the constructor, sets them as properties on the class that we can then access
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }
  /**
   * Invokes the userRegistration function on the fetchApiData service, with the userData from the form,
   * Invokes the userRegistration method on the fetchApiData service, with the userData from the form,
   * in order to register the user. Successful registration closes the form and a popup is displayed 
   * inviting the user to log in. If unsuccessful, a popup message will ask the user to try again with a 
   * different username.
   */

  registerUser(): void {
    // userRegistration function in the Api service, passing the userData
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Closes the dialog opened in the welcome-page
      // Message pops up to confirm successful registration
      this.snackBar.open(`Welcome to myFlix ${this.userData.userName}! Log in to to use the app.`, 'Cool!', 
        { duration: 4000, panelClass: 'snack-style' }
      );
    }, (result) => {
      console.log(result);
      this.snackBar.open("Sorry but something went wrong. Please try a different username", 'Ok',
      { duration: 4000, panelClass: 'snack-style' }
    );
  });
}
}