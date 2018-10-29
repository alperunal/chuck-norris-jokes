import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JokesComponent} from './jokes/jokes.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';

const routes: Routes = [
  {path: '', component: JokesComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
