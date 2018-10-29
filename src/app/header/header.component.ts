import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  authSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuth = this.authService.isAuth();
    this.authSubs = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = this.authService.isAuth();
    });
  }

  ngOnDestroy() {
    this.authSubs.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
