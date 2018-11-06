import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as JokesActions from './jokes.actions';
import {catchError, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {JokeService} from '../joke.service';
import {of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import {IJoke} from '../joke.model';

@Injectable()
export class JokesEffects {
  @Effect()
  favouritesChange = this.actions$
    .pipe(
      ofType(JokesActions.ADD_JOKE, JokesActions.REMOVE_JOKE),
      mergeMap((action: JokesActions.AddJoke | JokesActions.RemoveJoke) => {
        let status = true;
        if (action.type === JokesActions.REMOVE_JOKE) {
          status = false;
        }
        this.jokeService.favouriteJoke(action.payload.id, status);
        return [];
      }));

  constructor(private actions$: Actions,
              private store$: Store<fromApp.AppState>,
              private jokeService: JokeService) {}
}

/*
withLatestFrom(this.store$.select('jokes')),
      mergeMap(([action, jokes]) => {
        this.jokeService.favouriteJoke(jokes.favourites);
        return [];
      }));
 */
