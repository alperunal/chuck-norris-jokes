import {IUser} from './user.model';
import {IAuthData} from './auth-data.model';
import {Subject} from 'rxjs';


export class AuthService {
  private user: IUser;
  authChange = new Subject<boolean>();

  private generateId(): string {
    return Math.round(Math.random() * 10000).toString();
  }

  signUp(authData: IAuthData): void {
    this.user = {
      email: authData.email,
      userId: this.generateId()
    };
  }

  login(authData: IAuthData): void {
    this.user = {
      email: authData.email,
      userId: this.generateId()
    };
    this.authChange.next(true);
  }

  logout(): void {
    this.user = null;
    this.authChange.next(false);
  }

  getUser(): IUser {
    return { ...this.user };
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }
}
