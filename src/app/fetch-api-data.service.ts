import { Injectable } from '@angular/core';
// import statements
import { catchError, map } from 'rxjs/operators';
// Used to make the Api requests
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Url for the heroku hosted Api to which we will make our http requests
const apiUrl = 'https://herokumyflixdb.herokuapp.com/';
// Get token from local storage for requests
const token = localStorage.getItem('token');
// Get username from localStorage for URLs
const userName = localStorage.getItem('userName');


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
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // POST for logging in a user. (no token so no headers)
  public loginUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    // Response here should be the logged in user + the token generated at login
    return this.http.post(apiUrl + 'login', userDetails).pipe(catchError(this.handleError));
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

  // GET user by username
  public getUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.get(apiUrl + `users/` + userName, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // PUT to update the user's details
  public updateUser(Username: string, newDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    // users/${userName}
    const response = this.http.put(apiUrl + `users/` + Username, newDetails, { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }) });
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // DELETE user
  public deleteUser(user: string): Observable<any> {
    const token = localStorage.getItem('token');
    const response = this.http.delete(apiUrl + `users/` + user,
      { headers: new HttpHeaders({ Authorization: 'Bearer ' + token, }), responseType: 'text' }
    );
    return response.pipe(catchError(this.handleError));
  }

  // ---GET FAVOURITES MOVIES---
  //users/favorites/:userName
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    return this.http.get(apiUrl + `/users/favorites/${userName}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Reaact  /users/${userName}/favoriteMovies/${movie._id}
  // Postman /users/${userName}/favoriteMovies/${movieID}
  // ADD to favorites
  public addFavorite(userName: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${userName}/favoriteMovies/${movieID}`, null, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // DELETE movie from favorite 
  public deleteFavorite(userName: string, movieID: any): Observable<any> {
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
      console.error(`Error Status code ${error.status}, ` + `Error body is: ${JSON.stringify(error.error)}`);
    }
    return throwError('Something is not working. Try again later.');
  }
}