/** 
 * The MovieCardComponent is used to display the data retrieved from the movies collection of the
 * myFlix database. The data is looped through using the ngFor directive and each movie is rendered as
 * a mat card in the template. The cards display the title, director and an image of the movie and contain
 * buttons that can be opened to display dialogs with further information about the director or genre, 
 * or a synopsis. Movies can be added to or removed from favourites by clicking on a heart icon contained
 * in the top right corner of each card. The heart colour toggles accordingly to reflect the movie's status.
 * 
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
// Used to access various functions created on the service that are needed by this component
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

  /**
   * Calls the getMovies and getFavouriteMovies methods as soon as the component loads so that 
   * the data can be used to populate the template.
   */ 
  ngOnInit(): void {
    this.getMovies();
    this.getFavouriteMovies();
  }

  /** 
   * Invokes the getAllMovies method on the fetchApiData service and populates the movies array with
   * the response. 
   */ 
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => { this.movies = resp });
  }
  
  /** 
   * Invokes the getUser method on the fetchApiData service and populates the favourites array with
   * the favouriteMovies property on the response, which is an array of the user's favourite movies. 
   */
  getFavouriteMovies(): void {
    this.fetchApiData.getUser(this.userName!).subscribe((resp: any) => { this.favourites = resp.FavouriteMovies });
  }

  /**
   *  Extracts the IDs of the user's favourite movies and checks to see if the movie selected is 
   * included. Returns a specified theme colour value depending on whether the result is true or false. 
   * @param movieID ID of the movie selected.
   * @returns String value for the colour used to style the mat-icon-button in the template that
   * renders the heart icon on the movie's mat card.   
   */
  toggleHeart(movieID: string): string {
    let movieIds = this.favourites.map(favourite => { return favourite._id });
    return movieIds.includes(movieID) ? 'warn' : 'accent';
  }

  /**
   * Extracts the IDs of the user's favourite movies and checks to see if the movie selected is 
   * included. If included, calls the deleteMovieFromFavourites method; if not included, calls
   * the addMovieToFavourites method.
   * @param movieID ID of the movie selected.
   * @param Title Title of the movie.
   */
  toggleFavourite(movieID: string, Title: string): void {
    let movieIds = this.favourites.map(favourite => { return favourite._id });
    if (movieIds.includes(movieID)) {
      this.deleteMovieFromFavourites(movieID, Title);
    } else {
      this.addMovieToFavourites(movieID, Title);
    }
  }
  
  /**
   * Opens a dialog to display the genre component, passing it the data it needs to display
   * genre information inside the data object.
   * @param Name Name of the genre for the movie selected.
   * @param Description Description of the genre.
   */
  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreComponent, {
      data: { Name: Name, Description: Description },
      width: '250px'
    });
  }
  
   /**
   * Opens a dialog to display the director component, passing it the data it needs to display
   * information about the director inside the data object.
   * @param Name Name of the director of the movie selected.
   * @param Bio Biography of the director.
   * @param Birthday Birthday of the director.
   * @param Death Death of the director.
   */
  openDirectorDialog(Name: string, Bio: string, Birthday: string, Death: string): void {
    this.dialog.open(DirectorComponent, {
      data: { Name: Name, Bio: Bio, Birthday: Birthday, Death: Death },
      width: '250px'
    });
  }
  
   /**
   * Opens a dialog to display the synopsis component, passing it the data it needs to display a
   * synopsis of the movie within the data object.
   * @param Title Title of the movie selected.
   * @param Description Synopsis of the movie.
   */
  openSynopsisDialog(Title: string, Description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: { Title: Title, Description: Description },
      width: '250px'
    });
  }
 
    /**
   * Invokes the addFavourite method on the fetchApiData service, to add the movie to the user's
   * favourites. If successful a popup is displayed confirming that the movie has been added. If 
   * unsuccessful, a popup message asks the user to try again.
   * @param movieID ID of the movie selected.
   * @param Title Title of the movie selected.
   */
  addMovieToFavourites(movieID: string, title: string): void {
    this.fetchApiData.addFavourite(this.userName!, movieID).subscribe((resp: any) => {
      this.favourites = resp;
      this.snackBar.open(`${title} has been added to your favourites!`, 'Cool!',
        { duration: 4000, panelClass: 'snack-style' }
      );
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Hmm, we couldn't add ${title} to favourites. Please try again`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    });
  }
  
   /**
   * Invokes the deleteFavourite method on the fetchApiData service, to delete the movie from 
   * the user's favourites. If successful a popup is displayed confirming that the movie has been
   * removed. If unsuccessful, a popup message asks the user to try again.
   * @param movieID 
   * @param Title 
   */
  deleteMovieFromFavourites(movieID: string, title: string): void {
    this.fetchApiData.deleteFavourite(this.userName!, movieID).subscribe((resp: any) => {
      this.favourites = resp;
      this.snackBar.open(`${title} has been removed from your favourites!`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    }, (result) => {
      console.log(result);
      this.snackBar.open(`Hmm, we couldn't unfavourite ${title}. Please try again`, 'Ok',
        { duration: 4000, panelClass: 'snack-style' }
      );
    });
  }
  
   /**
   * Adjusts the font for one movie with a long title that is affecting the layout. For a larger
   * movies dataset where multiple movies may have longer titles, this could be refactored to use
   * the movieTitle length.
   * @param movieTitle The title of the movie being rendered.
   * @returns A number representing the font size in pixels used to style the movie title on the
   * movie's mat card.
   */
  fontSizer(movieTitle: string): number {
    if (movieTitle === 'The Big Bang Theory - Final Season (uncutted with extra)') {
      return 16
    } else {
      return 18
    }
  }
}