import * as JokeActions from './jokes.actions';
import {IJoke} from '../joke.model';

export interface State {
  favourites: IJoke[];
}

const initialState: State = {
  favourites: [],
};

export function FavouriteJokesReducer(state = initialState, action: JokeActions.JokesActions) {
  const favouriteJokes = [...state.favourites];
  switch (action.type) {
    case JokeActions.ADD_JOKE:
      if (favouriteJokes.length < 10) {
        return {
          ...state,
          favourites: [...state.favourites, action.payload]
        };
      } else {
        return state;
      }
    case JokeActions.REMOVE_JOKE:
      const i = favouriteJokes.findIndex(val => val.id === action.payload.id);
      if (i !== -1) {
        favouriteJokes.splice(i, 1);
      }
      return {
        ...state,
        favourites: favouriteJokes
      };
    case JokeActions.SET_JOKES:
      return {
        ...state,
        favourites: action.payload
      };
    default:
      return state;
  }
}
