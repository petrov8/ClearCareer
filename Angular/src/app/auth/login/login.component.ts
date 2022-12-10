import { AuthService } from '../auth.api.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { urlPaths } from './../../support/url.paths';
import { Router } from '@angular/router';
import { passwordRegex } from 'src/app/support/validators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent {
  
  registerPath: string = `/${urlPaths.register}`
  dashbaordPath: string = `/${urlPaths.dashboard}`


  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

    form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(passwordRegex)]]
    })

    get f() {
      return this.form.controls
    }

    onLogin() {
      
      if (this.form.invalid) {return}

      const {email, password} = this.form.value

      this.authService
      .login(email!, password!)
      .subscribe({
        next: () => {this.router.navigate([this.dashbaordPath])},
        error: (err) => {console.log(err.error.message)},
        complete: () => {}
      })  
    }
}
