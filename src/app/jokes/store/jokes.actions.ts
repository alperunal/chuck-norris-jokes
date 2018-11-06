import {Action} from '@ngrx/store';
import {IJoke} from '../joke.model';

export const ADD_JOKE = 'ADD_JOKE';
export const REMOVE_JOKE = 'REMOVE_JOKE';
export const SET_JOKES = 'SET_JOKES';

export class AddJoke implements Action {
  readonly type = ADD_JOKE;
  constructor(public payload: IJoke) {}
}

export class RemoveJoke implements Action {
  readonly type = REMOVE_JOKE;
  constructor(public payload: IJoke) {}
}

export class SetJokes implements Action {
  readonly type = SET_JOKES;
  constructor(public payload: IJoke[]) {}
}

export type JokesActions = AddJoke | RemoveJoke | SetJokes;
