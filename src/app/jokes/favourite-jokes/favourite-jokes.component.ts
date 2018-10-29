import {Component, EventEmitter, OnInit} from '@angular/core';
import {IJoke} from '../joke.model';
import {JokeService} from '../joke.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-favourite-jokes',
  templateUrl: './favourite-jokes.component.html',
  styleUrls: ['./favourite-jokes.component.css']
})
export class FavouriteJokesComponent implements OnInit {
  favouriteJokes: IJoke[] = [];
  favSubs: Subscription;
  isAuth = false;
  autoFavourite = false;
  autoFavouriteChange: EventEmitter<boolean> = new EventEmitter();
  intervalId: number;

  constructor(private jokeService: JokeService,
              private authService: AuthService) { }

  ngOnInit() {
    this.favouriteJokes = this.jokeService.getFavouriteJokes();
    this.favSubs = this.jokeService.favouriteJokesChange.subscribe(() => {
      this.favouriteJokes = this.jokeService.getFavouriteJokes();
    });
    /* this.authService.isAuthenticated().subscribe((response: HttpResponse<any>) => {
      if (response['msg'] === 'Authorized') {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    }, (error: Error) => {
      this.isAuth = false;
      console.log(error);
    }); */
    this.isAuth = this.authService.isAuth();
    this.authService.authChange.subscribe((status: boolean) => {
      this.isAuth = status;
    });

    /*
      Turn on/off a timer (every 5 seconds) which will add one random joke to the favorites list
    */
    this.autoFavouriteChange.subscribe((status) => {
      if (status) {
        this.intervalId = setInterval(() => {
          if (this.autoFavourite && this.favouriteJokes.length < 10) {
            this.jokeService.getRandomJoke().subscribe((joke: IJoke) => {
              this.jokeService.favouriteJoke(true, joke);
            });
          }
        }, 5000);
      } else {
        clearInterval(this.intervalId);
      }
    });
  }

  changeAutoFavourite(event: any): void {
    this.autoFavourite = event.checked;
    this.autoFavouriteChange.emit(event.checked);
  }

  favourite(fav: boolean, joke: IJoke): void {
    this.jokeService.favouriteJoke(fav, joke);
  }
}
