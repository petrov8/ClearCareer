import { UserProfileModel } from './../../_models/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { urlPaths } from './../../support/url.paths';
import { UserApiService } from "../user.api.service"
import { Subject, Subscription, takeUntil} from 'rxjs';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit, OnDestroy {
  
  componentDestroyed$: Subject<boolean> = new Subject() 
  paths = urlPaths
  sub: Subscription = new Subscription

  constructor(private userApi: UserApiService, public profile: UserProfileModel) {}


  ngOnInit(): void {  

    this.sub = this.userApi.getProfileUser()
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe({
      next: (res) => Object.assign(this.profile, res),
      error: (err) => console.log(err.error.message),
      complete: () => {}

    })
  }


  ngOnDestroy(): void {

    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
    
  }

}




