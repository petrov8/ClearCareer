import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { urlPaths } from 'src/app/support/url.paths';
import { UserApiService } from '../user.api.service';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})



export class DeleteuserComponent {

  paths = urlPaths
  sub: Subscription = new Subscription
  jobId: any 


  constructor(private router: Router, private userApi: UserApiService){}


  deleteUser() {

    event?.preventDefault()

    localStorage.clear()


    this.sub = this.userApi.deleteExistingUser().subscribe({
      next: () => {this.router.navigate(['/' + this.paths.home])},
      error: (err) => {console.log(err.error.message)},
      complete: () => this.sub.unsubscribe()
    })
  }

}
