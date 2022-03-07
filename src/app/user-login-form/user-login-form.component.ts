/** 
 * The UserLoginFormComponent is used to render a mat dialog containing a form where the
 * user can submit their credentials to log in to myFlix.
 * @module UserLoginFormComponent
 */
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// To access the loginUser function created on this service
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// To navigate  the user to the movies view on a successful login
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
 /** 
   * loginData values are populated by form inputs in the user-login-form template that are bound 
   * using the ngModel directive.
   */    
  loginData = { userName: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

   /**
   * Invokes the loginUser method on the fetchApiData service, with the loginData from the form,
   * in order to log in the user. A successful login closes the form and navigates the user to the
   * movies route. A popup is displayed confirming login success. If unsuccessful, a popup message
   * asks the user to check their username and password.
   */
  userLogin(): void {
    this.fetchApiData.loginUser(this.loginData).subscribe((result) => {
      this.dialogRef.close();
      /**
      * The user's username and token returned from the database are stored in local storage so that 
      * they can be used for subsequent requests to fetch movies, get a user's profile etc. Password
      * is set using the loginData so that an unhashed version can be used when displaying the user's
      * profile in the profile view (the database returns the hashed version).
      */
      localStorage.setItem('password', this.loginData.password);
      localStorage.setItem('user', result.user.userName);
      localStorage.setItem('token', result.token);
      console.log(result);
      this.snackBar.open(`Hi ${this.loginData.userName}. You're are now logged in!`, 'Cool!', { duration: 4000, panelClass: 'snack-style' });
      // Navigate to the movies route
      this.router.navigate(['movies']);
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Sorry ${this.loginData.userName} Something is wrong. Please check your username and password`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    });
  }
}
