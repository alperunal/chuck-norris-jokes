import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuardService} from './auth/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import {UtilService} from './util.service';
import {ToastrModule} from 'ngx-toastr';
import {StoreModule} from '@ngrx/store';
import {AuthInterceptor} from './auth/auth.interceptor';
import {reducers} from './store/app.reducers';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/store/auth.effects';
import {JokesEffects} from './jokes/store/jokes.effects';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    JokesComponent,
    FavouriteJokesComponent,
    HeaderComponent,
    RandomJokesComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, JokesEffects])
  ],
  providers: [
    AuthService,
    JokeService,
    AuthGuardService,
    UtilService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
