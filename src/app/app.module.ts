import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { JokesComponent } from './jokes/jokes.component';
import { FavouriteJokesComponent } from './jokes/favourite-jokes/favourite-jokes.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { RandomJokesComponent } from './jokes/random-jokes/random-jokes.component';
import {AuthService} from './auth/auth.service';
import {JokeService} from './jokes/joke.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    JokesComponent,
    FavouriteJokesComponent,
    HeaderComponent,
    RandomJokesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    JokeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
