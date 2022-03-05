import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent implements OnInit {
  // Set favourites equal to empty array
  favourites: any[] = [];
  // Username needed to make requests to Api endpoints
  userName = localStorage.getItem('user');

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { this.getFavouriteMovies() }

  getFavouriteMovies(): void {
    this.fetchApiData.getUser(this.userName!).subscribe((resp: any) => { this.favourites = resp.FavoriteMovies });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: { Name: name, Description: description },
      width: '280px'
    });
  }

  openDirectorDialog(Name: string, Bio: string, Birthday: string, Death: string): void {
    this.dialog.open(DirectorComponent, {
      data: { Name: Name, Bio: Bio, Birthday: Birthday, Death: Death },
      width: '280px'
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { description: description },
      width: '280px'
    });
  }

  deleteFavoriteMovie(movieID: string, title: string): void {
    this.fetchApiData.deleteFavorite(this.userName!, movieID).subscribe((resp: any) => {
      this.favourites = resp.FavoriteMovies;
      //users/${userName}/movies/${movieID}
      this.snackBar.open(`${title} removed from favourites!`, 'Ok', { duration: 4000, panelClass: 'snack-style' });
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Something went wrong with ${title}. Please try again`, 'Ok', {
        duration: 4000
      });
    });
  }

  // Function purely to adjust the font on one movie with a long title affecting the layout
  fontSizer(favouriteTitle: string): number {
    if (favouriteTitle === 'The Big Bang Theory - Final Season (uncutted with extra)') {
      return 16
    } else {
      return 18
    }
  }
}