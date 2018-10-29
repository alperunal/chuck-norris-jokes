import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IJoke} from '../joke.model';
import {JokeService} from '../joke.service';
import {MatTabChangeEvent} from '@angular/material';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-random-jokes',
  templateUrl: './random-jokes.component.html',
  styleUrls: ['./random-jokes.component.css']
})
export class RandomJokesComponent implements OnInit {
  randomJokes: Observable<IJoke[]>;
  isAuth = false;

  constructor(private jokeService: JokeService,
              private authService: AuthService) { }

  ngOnInit() {
    this.randomJokes = this.jokeService.getRandomJokes();
    this.isAuth = this.authService.isAuth();

    this.jokeService.tabChange.subscribe((event: MatTabChangeEvent) => {
      if (event.index === 0) {
        this.randomJokes = this.jokeService.getRandomJokes();
      }
    });

    this.authService.authChange.subscribe((status: boolean) => {
      this.isAuth = status;
    });
  }

  isFavourite(id: number): boolean {
    return this.jokeService.isFavourite(id);
  }

  favourite(fav: boolean, joke: IJoke): void {
    this.jokeService.favouriteJoke(fav, joke);
  }

}
