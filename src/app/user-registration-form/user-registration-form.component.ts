import { Component, OnInit } from '@angular/core';
// create a reference to the dialog opened in the welcome-page component, so can be closed if the registration is successful
import { MatDialogRef } from '@angular/material/dialog';
// userRegistration function created on this service to register a user in the registerUser function
import { FetchApiDataService } from '../fetch-api-data.service';
// create pop-up notifications to the user
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