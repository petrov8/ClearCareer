import { UserProfileModel } from './../../_models/models';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { urlPaths } from 'src/app/support/url.paths';
import { FormBuilder, Validators } from '@angular/forms';
import { UserApiService } from './../user.api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fullNameRegex } from 'src/app/support/validators';
import { composeUserHttpBody } from 'src/app/support/userMgmt';
import { convertImageToBase64 } from 'src/app/support/common';


@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['../../register.component.css']
})


export class EdituserComponent implements OnInit, OnDestroy {

  paths = urlPaths
  base64: any 
  subGet: Subscription = new Subscription
  subPut: Subscription = new Subscription
  componentDestroyed$: Subject<boolean> = new Subject() 


    constructor(
          private userApi: UserApiService, 
          private fb: FormBuilder, 
          private router: Router, 
          private profile: UserProfileModel 
    ){}

  
    form = this.fb.group({
      fullName: [this.profile.full_name, [Validators.required, Validators.minLength(2),Validators.maxLength(50),Validators.pattern(fullNameRegex)]],
      image: ["",],
      email: [this.profile.email,[Validators.required,Validators.email,]],
    })


    get f(){
      return this.form.controls;
    }

  
    ngOnInit(){

      this.subGet = this.userApi.getProfileUser()
      .subscribe({
        next: (res) => Object.assign(this.profile, res),
        error: (err) => alert(err.error.message),
        complete: () => {}
      })

    }

    onSubmit(){


      if (this.form.invalid) { return }

      let details = composeUserHttpBody(this.form, this.base64)
  
      this.userApi.editExistingUser(details)

      this.router.navigate([this.paths.profile])

    }


    async toBase64(event: any) {

      this.base64 = await convertImageToBase64(event)

  }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
    
  }
}
