import { Injectable } from '@angular/core';
// import statements
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://herokumyflixdb.herokuapp.com/';
@Injectable({
  // Indicates that this service will be provided to the root of app and hence available to all components
  providedIn: 'root'
})

export class FetchApiDataService {

  //  HttpClient to  let the service access its methods using this.http
  constructor(private http: HttpClient) { }

  // POST or register a new user
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    // Post request to the user registration endpoint
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // POST for logging in a user. (no token so no headers)
  public loginUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    const response = this.http.post(apiUrl + 'login', userDetails);
    return response.pipe(
      // Response here should be the logged in user + the token generated at login
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // GET all movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + 'movies', { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // GET a movie by title
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + `movies/${title}` + title, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // GET movie by genre
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + `movies/genres/${genreName}` + genreName, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // GET movie by director
  public getDirector(Name: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + `movies/directors/${Name}` + Name, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // GET user by username
  public getUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + `users/${userName}` + userName, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // PUT to update the user's details
  public updateUser(userName: string, newDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.put(apiUrl + `users/${userName}` + userName, newDetails, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // DELETE user
  public deleteUser(user: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + `users/${user}` + user, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(catchError(this.handleError));
  }

  // ADD movie to a user's list of favorites
  public addFavourite(userName: string, movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.put(apiUrl + `users/${userName}/favoriteMovies/${movie._id}`, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // DELETE movie from favorite 
  public deleteFavourite(userName: string, movieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + `users/${userName}/movies/${movieID}`, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Returns the response or an empty object
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  // Custom error handling function 
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, ` + `Error body is: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}