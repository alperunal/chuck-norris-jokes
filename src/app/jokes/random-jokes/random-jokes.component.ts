import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {IJoke} from '../joke.model';
import {JokeService} from '../joke.service';

@Component({
  selector: 'app-random-jokes',
  templateUrl: './random-jokes.component.html',
  styleUrls: ['./random-jokes.component.css']
})
export class RandomJokesComponent implements OnInit {
  randomJokes: Observable<IJoke[]>;

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    this.randomJokes = this.jokeService.getRandomJokes();
  }

  isFavourite(id: number): boolean {
    return this.jokeService.isFavourite(id);
  }

  favourite(fav: boolean, joke: IJoke): void {
    this.jokeService.favouriteJoke(fav, joke);
  }

}
