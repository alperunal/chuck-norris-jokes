import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import * as AuthActions from './auth.actions';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {IAuthData} from '../auth-data.model';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {JokeService} from '../../jokes/joke.service';

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$
    .pipe(
      ofType(AuthActions.TRY_LOGIN),
      map((action: AuthActions.TryLogin) => action.payload),
      switchMap((authData: IAuthData) => this.authService.login(authData)),
      mergeMap((token: string) => {
        this.router.navigate(['/']);
        this.toastr.success('Logged in');
        return [
            {
              type: AuthActions.LOGIN
            },
            {
              type: AuthActions.SET_TOKEN,
              payload: token
            },
          ];
      }));

  @Effect()
  authSetToken = this.actions$
    .pipe(
      ofType(AuthActions.SET_TOKEN),
      map((action: AuthActions.SetToken) => action.payload),
      mergeMap((token: string) => {
        window.localStorage.setItem('access-token', token);
        this.jokeService.initFavouriteJokes();
        return [];
      }));

  constructor(private actions$: Actions,
              private authService: AuthService,
              private router: Router,
              private jokeService: JokeService,
              private toastr: ToastrService) {}
}
