import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  // Variables
  form: FormGroup;
  loading: boolean;
  errors: any;

  constructor(
    fb: FormBuilder,
    public router: Router,
    private authService: AuthService
  ) {
    this.form = fb.group({
      name: ['', [Validators.required, Validators.maxLength(250)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.errors = [];
  }

  ngOnInit(): void {
  }

  /**
   * Getter for the form controls
   */
  get controls() {
    return this.form.controls;
  }

  signup() {
    this.loading = true;
    this.authService.signup(this.controls.name.value, this.controls.email.value, this.controls.password.value)
      .subscribe((res: any) => {
        // Store the access token in the localstorage
        localStorage.setItem('access_token', res.access_token);
        this.loading = false;
        // Navigate to home page
        this.router.navigate(['/']);
      }, (err: any) => {
        console.log('err')
        console.log(err.error.errors)
        this.errors = err.error.errors;
        // This error can be internal or invalid credentials
        // You need to customize this based on the error.status code
        this.loading = false;
      });
  }
}
