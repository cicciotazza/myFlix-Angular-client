import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  user: any = { }; // Create a user variable that is an empty object
  userName = localStorage.getItem('user'); // userName needed to make the requests to the Api endpoints
  password = localStorage.getItem('password'); // We want to display an unhashed password to the user so we retrieve it from local storage
  
  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { this.getProfile() } // We want the data to populate the template as soon as the component loads
// Gets the user data and populates the user object
  getProfile(): void {
    this.fetchApiData.getUser(this.userName!).subscribe((resp: any) => { this.user = resp });
  }
// Opens a dialog to display the edit-profile-form component
  openEditProfileFormDialog(): void {
    this.dialog.open(EditProfileFormComponent, { width: '280px' });
  }
// Deletes the user and redirects back to the welcome page
  deleteProfile(): void {
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