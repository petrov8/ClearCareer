import { Router } from '@angular/router';
import { AuthService } from '../auth.api.service';
import { Component, OnInit } from '@angular/core';
import { urlPaths } from 'src/app/support/url.paths';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit{

  homePath: string = `/${urlPaths.home}`

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.clearLocalStorage()
    this.router.navigate([this.homePath])
  }
}
