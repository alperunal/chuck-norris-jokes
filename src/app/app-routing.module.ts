import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JokesComponent} from './jokes/jokes.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
  { path: '', component: JokesComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
