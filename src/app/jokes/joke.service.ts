import {IJoke} from './joke.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class JokeService {
  favouriteJokes: IJoke[] = [];
  favouriteJokesChange = new Subject<boolean>();
  localStorage = window.localStorage;

  constructor(private http: HttpClient) {
    const favJokes = this.localStorage.getItem('favouriteJokes');
    if (favJokes !== null) {
      this.favouriteJokes = JSON.parse(favJokes);
    }
  }

  getRandomJokes(): Observable<IJoke[]> {
    return this.http.get('http://api.icndb.com/jokes/random/10')
      .pipe(map((res: HttpResponse<Response>) => {
        return res['value'];
      }));
  }

  getRandomJoke(): Observable<IJoke> {
    return this.http.get('http://api.icndb.com/jokes/random/1')
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
    this.localStorage.setItem('favouriteJokes', JSON.stringify(this.favouriteJokes));
    this.favouriteJokesChange.next(true);
  }

  isFavourite(id: number): boolean {
    return !!this.favouriteJokes.find((value) => {
      if (value.id === id) {
        return true;
      }
    });
  }
}
