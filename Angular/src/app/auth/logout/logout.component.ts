import { AlertifyService } from './../../services/alertify-service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { urlPaths } from 'src/app/support/url.paths';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  homePath: string = `/${urlPaths.home}`

  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}

  ngOnInit(): void {
    this.authService.clearLocalStorage()
    this.alertify.onSuccess("Logout succesful")
    this.router.navigate([this.homePath])
    
  }
}
