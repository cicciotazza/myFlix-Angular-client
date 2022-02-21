import { Component, OnInit } from '@angular/core';
// Create a reference to the dialog that we open in the app component so it close itsfelf if registration is successful
import { MatDialogRef } from '@angular/material/dialog';
// Use the userRegistration function created on this service to register a user in the registerUser function
import { FetchApiDataService } from '../fetch-api-data.service';
// Used to create pop-up notifications to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})

export class UserRegistrationFormComponent implements OnInit {
  userData = { Username: '', Password: '', Email: '', Birthday: '' };

  // Passing these parameters as properties on each instance of the class
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  registerUser(): void {
    // invokes the userRegistration function in our Api service, passing the userData
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Logic for a successful user registration goes here
      // Closes the dialog opened when the user clicks registration button in the app component
      this.dialogRef.close();
      console.log(result);
      // Message pops up to confirm successful registration
      this.snackBar.open('Registration completed!', 'OK', {
        duration: 5000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'Sorry, try a different username', {
        duration: 4000
      });
    });
  }
}