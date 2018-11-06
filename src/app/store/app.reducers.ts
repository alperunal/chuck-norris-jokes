import * as fromJokes from '../jokes/store/jokes.reducers';
import * as fromAuth from '../auth/store/auth.reducers';
import {ActionReducerMap} from '@ngrx/store';

export interface AppState {
  jokes: fromJokes.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  jokes: fromJokes.FavouriteJokesReducer,
  auth: fromAuth.authReducer
};
