import {IJoke} from './joke.model';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatTabChangeEvent} from '@angular/material';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as FavouriteJokesActions from '../jokes/store/jokes.actions';

@Injectable()
export class JokeService {
  tabChange = new EventEmitter<MatTabChangeEvent>();
  private readonly host = environment.apiUrl;

  constructor(private http: HttpClient,
              private store: Store<fromApp.AppState>) {

  }

  initFavouriteJokes(): void {
    this.http.get(`${this.host}/api/v1/favourite-jokes`).subscribe(
      (response: any) => {
        const favouriteJokes: IJoke[] = JSON.parse(response.favourites);
        this.store.dispatch(new FavouriteJokesActions.SetJokes(favouriteJokes));
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

  favouriteJokes(jokes: IJoke[]): void {
    this.http.put(`${this.host}/api/v1/favourite-jokes`, JSON.stringify(jokes)).subscribe((res) => {
      console.log(res);
    });
  }

  favouriteJoke(jokeId: number, status: boolean): void {
    this.http.put(`${this.host}/api/v1/favourite-jokes`,
      {
        jokeId: jokeId,
        status: status
      })
      .subscribe((res) => {
        console.log(res);
    });
  }
}
