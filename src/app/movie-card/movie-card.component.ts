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
  favourites: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService, 
    public dialog: MatDialog, 
    public snackBar: MatSnackBar
  ) { }

// Fetch movies and favourites when the component is loaded
  ngOnInit(): void { 
    this.getMovies(); 
    this.getFavouriteMovies();
  }
// Fetches movies and sets the value of the movies property to the response
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => { this.movies = resp });
  }
// Fetches user and sets the value of the favourites property to the favouriteMovies property on the response
  getFavouriteMovies(): void {
    this.fetchApiData.getUser(this.userName!).subscribe((resp: any) => { this.favourites = resp.FavouriteMovies });
  }
// Checks to see if a movie id is included within the array of IDs of the user's fav movies and returns a 
// specific theme colour depending on whether the result is true or false. The return value becomes the 
// value of the color attribute for the icon button in the template
  toggleHeart(movieID: string): string {
    let movieIds = this.favourites.map(favourite => { return favourite._id });
    return movieIds.includes(movieID) ? 'warn' : 'accent';
  }
//  Adds or removes a movie from the user's favourites depending on whether the movie is currently included within their favourites or not 
  toggleFavourite(movieID: string, Title: string): void {
    let movieIds = this.favourites.map(favourite => { return favourite._id });
    if (movieIds.includes(movieID)) {
      this.deleteMovieFromFavourites(movieID, Title);
    } else {
      this.addMovieToFavourites(movieID, Title);
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
      data: { name: Name, bio: Bio, Birthday: Birthday, Death: Death },
      width: '250px' 
    });
  }
// Dialog to display the synopsis component, passing it the data it needs within the data object
  openSynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { Title: Title, description: Description },
      width: '250px' 
    });
  }
// Adds the selected movie to the user's favourites
  addMovieToFavourites(movieID: string, title: string): void {
    this.fetchApiData.addFavourite(this.userName!, movieID).subscribe((resp: any) => { 
      this.favourites = resp;
      this.snackBar.open(`${title} has been added to your favourites!`, 'Cool!', 
        { duration: 4000, panelClass: 'snack-style' }
      );
    },  (result) => {
        console.log(result);
        this.snackBar.open(`Hmm, we couldn't add ${title} to favourites. Please try again`, 'Ok',
          { duration: 4000, panelClass: 'snack-style' }
        ); 
    });
  }
// Deletes the selected movie from the user's favourites
  deleteMovieFromFavourites(movieID: string, title: string): void {
    this.fetchApiData.deleteFavourite(this.userName!, movieID).subscribe((resp: any) => { 
      this.favourites = resp;
      this.snackBar.open(`${title} has been removed from your favourites!`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    },  (result) => {
        console.log(result);
        this.snackBar.open(`Hmm, we couldn't unfavourite ${title}. Please try again`, 'Ok', 
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