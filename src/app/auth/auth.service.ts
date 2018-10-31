import {IUser} from './user.model';
import {IAuthData} from './auth-data.model';
import {Observable, Subject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {UtilService} from '../util.service';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private readonly host = environment.apiUrl;
  private storage = window.localStorage;
  private readonly tokenKey = 'access-token';

  constructor(private http: HttpClient,
              private router: Router,
              private utilService: UtilService,
              private toastr: ToastrService) {}

  signUp(authData: IAuthData): void {}

  login(authData: IAuthData): void {
    this.utilService.setIsLoading(true);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.post(`${this.host}/login`,
      { username: authData.email, password: authData.password },
      {headers: headers})
      .subscribe(
      (response: HttpResponse<any>) => {
        this.setToken(response['token']);
        this.authChange.next(true);
        this.router.navigate(['']);
        this.toastr.success('Logged in');
        this.utilService.setIsLoading(false);
      }, (error: Error) => {
        this.utilService.setIsLoading(false);
        console.log(error);
        this.toastr.error(error['error'].err);
    });
  }

  logout(): void {
    this.removeToken();
    this.authChange.next(false);
    this.router.navigate(['']);
    this.toastr.success('Logged out');
  }

  private setToken(value: string): void {
    this.storage.setItem(this.tokenKey, value);
  }

  getToken(): string {
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

  healthCheck(): Observable<any> {
    return this.http.get(`${this.host}/healthcheck`)
      .pipe(map(
        (response: HttpResponse<any>) => {
          // @ts-ignore
          return response.status === 'OK';
        }
      ));
  }

  isAuthenticated(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get(`${this.host}/login/verify`, {headers: headers});
  }
}
