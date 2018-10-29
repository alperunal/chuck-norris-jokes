import { Component, OnInit } from '@angular/core';
import {JokeService} from './joke.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {

  constructor(private jokeService: JokeService) { }

  ngOnInit() {}

}
