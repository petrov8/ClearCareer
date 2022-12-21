import { returnLocalStorageItem } from 'src/app/support/userMgmt';
import { JobSpecific } from 'src/app/_typesCustom/job';
import { JobExistingModel } from './../../_models/job';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsApiService } from './../jobs.api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { urlPaths } from "../../support/url.paths"

import { NavBarService } from 'src/services/nav-bar-dynamic.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})


export class DetailsComponent implements OnInit, OnDestroy {
  paths = urlPaths

  sub: Subscription = new Subscription
  jobId: any 


  constructor(
    private jobApi: JobsApiService, 
    private router: Router, 
    public currentJob: JobExistingModel,
    private nav: NavBarService
    ){}


  getJobId(){
 
    return this.router.url.split("/").pop();

  }


  ngOnInit(): void {

    this.jobId = this.getJobId()


    this.sub = this.jobApi.getSpecificJob(this.jobId).subscribe({
      next: (res) => Object.assign(this.currentJob, res),
      error: (err) => console.log(err),
      complete: () => {}
    })

  }

  ngOnDestroy(): void {

    this.sub.unsubscribe()
    
  }


  get isAdmin(){
    return this.nav.isAdmin()
  }

  get isOwner(){
    return (returnLocalStorageItem("_email") === this.currentJob.recruiter_email)
  }


  get isJobSeeker(){
    return this.nav.isJobSeeker()
  }

  
}
