import { Subscription } from 'rxjs';
import { composeUserHttpBody } from 'src/app/support/userMgmt';
import { Router } from '@angular/router';


import { AuthService } from '../auth.api.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { urlPaths } from './../../support/url.paths';
import { ConfirmedValidator, passwordRegex, fullNameRegex} from '../../support/validators';
import { convertImageToBase64 } from 'src/app/support/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html', 
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {
  subPost: Subscription = new Subscription
  paths = urlPaths
  base64: any 

  constructor(
    private fb: FormBuilder, 
    private authApi: AuthService,  
    private router: Router
    ){}

    form = this.fb.group({
      fullName: ["", [Validators.required, Validators.minLength(2),Validators.maxLength(50),Validators.pattern(fullNameRegex)]],
      email: ["",[Validators.required,Validators.email]],
      password: ["",[Validators.required,Validators.minLength(8),Validators.maxLength(255),Validators.pattern(passwordRegex)]],
      image: ["",],
      password2: ["",[Validators.required,]],
      role: ["",[Validators.required,]],}, {validator: ConfirmedValidator('password', 'password2')})
      


    get f(){
      return this.form.controls;
    }


    onRegister() {

      if (this.form.invalid) { return }

      let details = composeUserHttpBody(this.form, this.base64)

      this.subPost = this.authApi.register(details)
      .subscribe({
        next: () => {this.router.navigate([this.paths.dashboard])},
        error: (err) => {alert(err.error.message)},
        complete: () => {}
      })  
      }


    async toBase64(event: any) {

        this.base64 = await convertImageToBase64(event)
  
    }







  
}


