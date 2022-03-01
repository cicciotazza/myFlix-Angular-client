import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// to route the user to the movies view on a successful login
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {
  // loginData values will be populated by using the ngModel directive on the form inputs in the user-login-form template
  loginData = { userName: '', password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  userLogin(): void {
    this.fetchApiData.loginUser(this.loginData).subscribe((result) => {
      this.dialogRef.close();
      // localStorage password uses the loginData because the password returned by the api is hashed
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
