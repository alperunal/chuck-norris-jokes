import {IUser} from './user.model';
import {IAuthData} from './auth-data.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  private readonly host = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(authData: IAuthData): Observable<any> {
    return this.http.post(`${this.host}/login`,
      { username: authData.email, password: authData.password })
      .pipe(
        map((response: HttpResponse<any>) => {
          return response['token'];
        })
      );
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.host}/api/v1/users/myprofile`)
      .pipe(map((response: HttpResponse<any>) => {
        const user: IUser = {
          username: response['user'].username,
          email: response['user'].email,
          firstname: response['user'].firstname,
          lastname: response['user'].lastname
        };
        return user;
      }));
  }

  healthCheck(): Observable<any> {
    return this.http.get(`${this.host}/healthcheck`)
      .pipe(map(
        (response: HttpResponse<any>) => {
          // @ts-ignore
          return response.status === 'OK';
        }
      ));
  }
}
