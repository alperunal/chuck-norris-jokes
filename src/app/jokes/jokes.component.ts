import {Component, EventEmitter, OnInit} from '@angular/core';
import {JokeService} from './joke.service';
import {MatTabChangeEvent} from '@angular/material';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css']
})
export class JokesComponent implements OnInit {

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
  }

  change(event: MatTabChangeEvent) {
    this.jokeService.tabChange.emit(event);
  }

}
