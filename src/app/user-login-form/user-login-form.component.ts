import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})

export class UserLoginFormComponent implements OnInit {

  loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  userLogin(): void {
    this.fetchApiData.loginUser(this.loginData).subscribe((result) => {
      this.dialogRef.close();
      localStorage.setItem('user', result.user.Username);
      localStorage.setItem('token', result.token);
      console.log(result);
      this.snackBar.open('Login successful!', 'OK', { // Message pops up to confirm successful registration
        duration: 4000
      });
    }, (result) => {
      console.log(result);
      this.snackBar.open("Log in failed. Please check username and password", 'OK', {
        duration: 4000
      });
    });
  }
}