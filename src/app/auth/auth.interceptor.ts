import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';
import {Store} from '@ngrx/store';
import {first, flatMap, switchMap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      first(),
      flatMap((authState: fromAuth.State) => {
        const clonedRequest = req.clone({headers: req.headers
            .append('Content-Type', 'application/json')
            .append('Authorization', 'Bearer ' + authState.token)});
        return next.handle(clonedRequest);
      }));
  }
}
