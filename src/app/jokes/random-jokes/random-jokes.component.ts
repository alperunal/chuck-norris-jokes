import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IJoke} from '../joke.model';
import {JokeService} from '../joke.service';
import {MatTabChangeEvent} from '@angular/material';
import {AuthService} from '../../auth/auth.service';
import * as FavouriteJokesActions from '../store/jokes.actions';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-random-jokes',
  templateUrl: './random-jokes.component.html',
  styleUrls: ['./random-jokes.component.css']
})
export class RandomJokesComponent implements OnInit {
  randomJokes: Observable<IJoke[]>;
  favouriteJokes: IJoke[];
  authState: Observable<fromAuth.State>;

  constructor(private jokeService: JokeService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.randomJokes = this.jokeService.getRandomJokes();
    this.authState = this.store.select('auth');
    this.store.select('jokes').subscribe(favouriteJokes => {
      this.favouriteJokes = favouriteJokes.favourites;
    });
    this.jokeService.tabChange.subscribe((event: MatTabChangeEvent) => {
      if (event.index === 0) {
        this.randomJokes = this.jokeService.getRandomJokes();
      }
    });
  }

  isFavourite(id: number): boolean {
    return !!this.favouriteJokes.find((value) => {
      if (value.id === id) {
        return true;
      }
    });
  }

  favourite(status: boolean, joke: IJoke): void {
    if (status) {
      this.store.dispatch(new FavouriteJokesActions.AddJoke(joke));
    } else {
      this.store.dispatch(new FavouriteJokesActions.RemoveJoke(joke));
    }
  }

}
