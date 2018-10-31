import {IJoke} from './joke.model';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatTabChangeEvent} from '@angular/material';
import {environment} from '../../environments/environment';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class JokeService {
  favouriteJokes: IJoke[] = [];
  favouriteJokesChange = new Subject<boolean>();
  tabChange = new EventEmitter<MatTabChangeEvent>();
  // localStorage = window.localStorage;
  private readonly host = environment.apiUrl;

  constructor(private http: HttpClient,
              private authService: AuthService) {

    /*
    ** local storage
    const favJokes = this.localStorage.getItem('favouriteJokes');
    if (favJokes !== null) {
      this.favouriteJokes = JSON.parse(favJokes);
    }
    */
  }

  initFavouriteJokes(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken()
    });

    this.http.get(`${this.host}/api/v1/favourite-jokes`, {headers: headers}).subscribe(
      (response: any) => {
        if (this.authService.isAuth()) {
          const favouriteJokes = JSON.parse(response.favourites);
          if (favouriteJokes !== null) {
            this.favouriteJokes = favouriteJokes;
            this.favouriteJokesChange.next(true);
          }
        }
      }
    );
  }

  getRandomJokes(): Observable<IJoke[]> {
    const params = new HttpParams().set('count', '10');
    return this.http.get(`${this.host}/api/v1/random-jokes`, {params: params})
      .pipe(map((res: HttpResponse<Response>) => {
        return res['value'];
      }));
  }

  getRandomJoke(): Observable<IJoke> {
    const params = new HttpParams().set('count', '1');
    return this.http.get(`${this.host}/api/v1/random-jokes`, {params: params})
      .pipe(map((res: HttpResponse<Response>) => {
        return res['value'][0];
      }));
  }

  getFavouriteJokes(): IJoke[] {
    return [ ...this.favouriteJokes ];
  }

  favouriteJoke(status: boolean, joke: IJoke): void {
    if (status && this.favouriteJokes.length < 10) {
      this.favouriteJokes.push(joke);
    } else {
      const i = this.favouriteJokes.findIndex(val => val.id === joke.id);
      if (i !== -1) {
        this.favouriteJokes.splice(i, 1);
      }
    }
    // this.localStorage.setItem('favouriteJokes', JSON.stringify(this.favouriteJokes));
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.authService.getToken()
    });
    this.http.put(`${this.host}/api/v1/favourite-jokes`, JSON.stringify(this.favouriteJokes), {headers: headers}).subscribe(
      (response: HttpResponse<Response>) => {
        // console.log(response);
        this.favouriteJokesChange.next(true);
      }, (error: Error) => {
        console.log(error);
      }
    );
  }

  isFavourite(id: number): boolean {
    return !!this.favouriteJokes.find((value) => {
      if (value.id === id) {
        return true;
      }
    });
  }
}
