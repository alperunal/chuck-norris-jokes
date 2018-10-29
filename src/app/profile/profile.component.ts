import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {IUser} from '../auth/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileSubs: Subscription;
  myProfile: IUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.profileSubs = this.authService.getProfile().subscribe(
      (response: IUser) => {
        this.myProfile = response;
      }
    );
  }

  ngOnDestroy() {
    this.profileSubs.unsubscribe();
  }

}
