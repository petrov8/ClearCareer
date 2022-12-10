import { JobsApiService } from './../jobs.api.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component} from '@angular/core';
import { urlPaths } from "../../support/url.paths"
import { getJobId } from 'src/app/support/jobMgmt';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})



export class DeleteComponent {

  paths = urlPaths
  sub: Subscription = new Subscription
  jobId: any 
  dashbaordPath: string = `/${urlPaths.dashboard}`


  constructor(private router: Router, private apiService: JobsApiService){}


  deleteJob() {

    event?.preventDefault()

    this.jobId = getJobId(this.router)

    this.sub = this.apiService.deleteExistingJob(this.jobId)
    .subscribe({
      next: () => {this.router.navigate(['/' + this.paths.dashboard])},
      error: (err) => {console.log(err.error.message)},
      complete: () => this.sub.unsubscribe()
    })
  }
}


