import {Component, EventEmitter, OnInit} from '@angular/core';
import {IJoke} from '../joke.model';
import {JokeService} from '../joke.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

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
    this.isAuth = this.authService.isAuthenticated();
    this.authService.authChange.subscribe((status: boolean) => {
      this.isAuth = status;
    });
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
