import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      username: new FormControl('', {
        validators: [Validators.required]
      }),
      passwords: new FormGroup({
        password: new FormControl('', {
          validators: [Validators.required, Validators.maxLength(32)]
        }),
        repeatPassword: new FormControl('', {
          validators: [Validators.required, Validators.maxLength(32)]
        })
      }),
      firstname: new FormControl(''),
      lastname: new FormControl('')
    });
  }

  onSubmit() {
    console.log(this.signupForm);
    this.authService.signUp({
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    });
  }

}
