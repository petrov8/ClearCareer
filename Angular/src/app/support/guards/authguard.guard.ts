
import { urlPaths } from 'src/app/support/url.paths';
import { AlertifyService } from './../../../services/alertify-service';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { returnLocalStorageItem } from '../userMgmt';


@Injectable({
  providedIn: 'root'
})


export class AuthguardGuard implements CanActivate {

  constructor(private alertify: AlertifyService, private router: Router){}
  
  canActivate() {
    if (returnLocalStorageItem("token")){
      return true 
    } else {
      this.alertify.onWarning("You are nog logged in.")
      this.router.navigate([urlPaths.login])
      return false 
    }
  }
  
}
