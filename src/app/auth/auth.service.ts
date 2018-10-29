import {IUser} from './user.model';
import {IAuthData} from './auth-data.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {deprecate} from 'util';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private readonly host = 'http://localhost:3000';
  private storage = window.localStorage;
  private readonly tokenKey = 'access-token';

  constructor(private http: HttpClient,
              private router: Router) {}

  private generateId(): string {
    return Math.round(Math.random() * 10000).toString();
  }

  signUp(authData: IAuthData): void {
    /*
    this.user = {
      email: authData.email,
      id: this.generateId()
    };
    */
  }

  login(authData: IAuthData): void {
    this.authChange.next(true);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post(`${this.host}/login`,
      { username: authData.email, password: authData.password },
      {headers: headers})
      .subscribe(
      (response: HttpResponse<any>) => {
        this.setToken(response['token']);
        this.router.navigate(['']);
      }, (error: Error) => {
      console.log(error);
    });
  }

  logout(): void {
    this.removeToken();
    this.authChange.next(false);
    this.router.navigate(['']);
  }

  private setToken(value: string): void {
    this.storage.setItem(this.tokenKey, value);
  }

  private getToken(): string {
    return this.storage.getItem(this.tokenKey);
  }

  private removeToken(): void {
    this.storage.removeItem(this.tokenKey);
  }

  isAuth(): boolean {
    return !!this.getToken();
  }

  getProfile(): Observable<any> {
    if (!this.isAuth()) {
      return null;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getToken()
    });

    return this.http.get(`${this.host}/api/v1/users/myprofile`, {headers: headers})
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

  /*
  API Verification
  isAuthenticated(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get(`${this.host}/login/verify`, {headers: headers});
  }
  */
}
