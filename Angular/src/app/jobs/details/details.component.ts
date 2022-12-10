import { JobSpecific } from 'src/app/_typesCustom/job';
import { JobExistingModel } from './../../_models/job';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsApiService } from './../jobs.api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { urlPaths } from "../../support/url.paths"



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent implements OnInit, OnDestroy {
  paths = urlPaths

  sub: Subscription = new Subscription
  jobId: any 


  constructor(private jobApi: JobsApiService, private router: Router, public currentJob: JobExistingModel){}


  getJobId(){
 
    return this.router.url.split("/").pop();

  }


  ngOnInit(): void {

    this.jobId = this.getJobId()


    this.sub = this.jobApi.getSpecificJob(this.jobId).subscribe({
      next: (res) => this.assignJobs(res) ,
      error: (err) => console.log(err),
      complete: () => {}
    })

  }

  ngOnDestroy(): void {

    this.sub.unsubscribe()
    
  }

  assignJobs(source: JobSpecific) {

    Object.assign(this.currentJob, source)

  }

  
}
