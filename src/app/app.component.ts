import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {UtilService} from './util.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isServerOnline = false;
  isLoading = false;
  healthSubs: Subscription;
  loadingSubs: Subscription;
  constructor(private authService: AuthService,
              private utilService: UtilService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.healthSubs = this.authService.healthCheck().subscribe(
      (response: boolean) => {
        this.isServerOnline = response;
      }, (error: Error) => {
        console.log(error);
        this.isServerOnline = false;
      }
    );

    this.loadingSubs = this.utilService.isLoadingChange.subscribe((status) => {
      this.isLoading = status;
      this.cdr.detectChanges();
    });

    setInterval(() => this.authService.healthCheck(), 30000);
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
    this.healthSubs.unsubscribe();
  }
}
