import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  // userName needed to make the requests to the Api endpoints
  userName = localStorage.getItem('user');
  movies: any[] = [];
  favorites: string[] = [];


  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  // Fetch movies and favourites when the component is loaded
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }
  // Fetches movies and sets the value of the movies property to the response
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => { this.movies = resp });
  }
  // Fetches user and sets the value of the favourites property to the favouriteMovies property on the response
  getFavoriteMovies(): void {
    this.fetchApiData.getUser(this.userName!).subscribe((resp: any) => { 
      this.favorites = resp.FavoriteMovies
     });
  }

  // Checks to see if a movie id is included within the array of IDs of the user's fav movies and returns a 
  // specific theme colour depending on whether the result is true or false. The return value becomes the 
  // value of the color attribute for the icon button in the template
  //Alternative 1
  /*
  isFavoriteMovie(movieID: string): string {
  let movieIds = this.favorites.map(favorite => { return favorite._id });
  return movieIds.includes(movieID) ? 'warn' : 'accent';
  }
  */
  // Alternative 2
  /*  
  isFavoriteMovie(movieID: string): Boolean {
  return this.favorites.some((id) => id === movieID);
  } 
  */
 
  //Alternative 3
  isFavoriteMovie(movieID: string): boolean {
    return this.favorites.some((movie: string) => movie === movieID);
  }

  //  Adds or removes a movie from the user's favourites depending on whether the movie is currently included within their favourites or not 
  toggleFavorite(movieID: string, Title: string): void {
     if (this.favorites.includes(movieID)) {
      this.deleteMovieFromFavorites(movieID, Title);
    } else {
      this.addMovieToFavorites(movieID, Title);
    }
  }

  // Dialog to display the genre component, passing it the data it needs within the data object
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: { Name: Name, Description: Description },
      width: '250px'
    });
  }
  // Dialog to display the director component, passing it the data it needs within the data object
  openDirectorDialog(Name: string, Bio: string, Birthday: string, Death: string): void {
    this.dialog.open(DirectorComponent, {
      data: { Name: Name, Bio: Bio, Birthday: Birthday, Death: Death },
      width: '250px'
    });
  }
  // Dialog to display the synopsis component, passing it the data it needs within the data object
  openSynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { Title: Title, Description: Description },
      width: '250px'
    });
  }
  // Adds the selected movie to the user's favourites
  addMovieToFavorites(movieID: string, title: string): void {
    this.fetchApiData.addFavorite(this.userName!, movieID).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      this.snackBar.open(`${title} has been added to your favorites!`, 'Cool!',
        { duration: 4000, panelClass: 'snack-style' }
      );
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Hmm, we couldn't add ${title} to favorites. Please try again`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    });
  }
  // Deletes the selected movie from the user's favorites
  deleteMovieFromFavorites(movieID: string, title: string): void {
    this.fetchApiData.deleteFavorite(this.userName!, movieID).subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      this.snackBar.open(`${title} has been removed from your favorites!`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Hmm, we couldn't unfavorite ${title}. Please try again`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    });
  }
  // This function is purely to adjust the font on one movie with a long title that is affecting the layout
  // For a larger movies dataset where multiple movies may have longer titles this could be refactored to use the movieTitle length
  fontSizer(movieTitle: string): number {
    if (movieTitle === 'The Big Bang Theory - Final Season (uncutted with extra)') {
      return 16
    } else {
      return 18
    }
  }
}