import { UserProfileModel } from './../../_models/models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { urlPaths } from './../../support/url.paths';
import { UserApiService } from "../user.api.service"
import { Subscription} from 'rxjs';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})



export class ProfileComponent implements OnInit, OnDestroy {
  paths = urlPaths
  sub: Subscription = new Subscription

  constructor(private userApi: UserApiService, public profile: UserProfileModel) {}


  ngOnInit(): void {  

    this.sub = this.userApi.getProfileUser().subscribe({
      next: (res) => Object.assign(this.profile, res),
      error: (err) => console.log(err.error.message),
      complete: () => {}

    })
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }

}




