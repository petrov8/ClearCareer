import { AuthService } from '../../auth/auth.api.service';
import { Component, OnInit } from '@angular/core';
import { urlPaths } from './../../support/url.paths';
import { canPostJobs, isRecruiter } from './../../support/userMgmt';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})


export class NavComponent {
  paths = urlPaths
  canPost = canPostJobs()
  isRecruiter = isRecruiter()


  constructor (public authService: AuthService) {}

  


  
}
