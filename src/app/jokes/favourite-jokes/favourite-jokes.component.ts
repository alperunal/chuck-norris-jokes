import {Component, EventEmitter, OnInit} from '@angular/core';
import {IJoke} from '../joke.model';
import {JokeService} from '../joke.service';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromJokes from '../store/jokes.reducers';
import * as FavouriteJokesActions from '../store/jokes.actions';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-favourite-jokes',
  templateUrl: './favourite-jokes.component.html',
  styleUrls: ['./favourite-jokes.component.css']
})
export class FavouriteJokesComponent implements OnInit {
  favouriteJokesState: Observable<fromJokes.State>;
  autoFavourite = false;
  autoFavouriteChange: EventEmitter<boolean> = new EventEmitter();
  intervalId: number;
  authState: Observable<fromAuth.State>;

  constructor(private jokeService: JokeService,
              private authService: AuthService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.favouriteJokesState = this.store.select('jokes');
    this.authState = this.store.select('auth');

    this.autoFavouriteChange.subscribe((status) => {
      if (status) {
        this.intervalId = setInterval(() => {
          if (this.autoFavourite) {
            this.jokeService.getRandomJoke().subscribe((joke: IJoke) => {
              this.store.dispatch(new FavouriteJokesActions.AddJoke(joke));
            });
          }
        }, 5000);
      } else {
        clearInterval(this.intervalId);
      }
    });
  }

  changeAutoFavourite(event: any): void {
    this.autoFavourite = event.checked;
    this.autoFavouriteChange.emit(event.checked);
  }

  removeFavourite(joke: IJoke): void {
    this.store.dispatch(new FavouriteJokesActions.RemoveJoke(joke));
  }
}
