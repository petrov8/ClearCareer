
import { NavBarService } from '../../../services/nav-bar-dynamic.service';
import { AuthService } from '../../auth/auth.api.service';
import { Component, Injectable } from '@angular/core';
import { urlPaths } from './../../support/url.paths';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})


export class NavComponent {
  paths = urlPaths


  constructor (public authService: AuthService, private nav: NavBarService) {}

  get showNewJob(){
    return this.nav.canEditPosts()
  }

  get isRecuiter(){
    return this.nav.isRecruiter()

  }

}
