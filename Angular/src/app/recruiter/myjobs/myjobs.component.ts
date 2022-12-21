import { RecruiterApiService } from './../recruiter.api.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { urlPaths } from 'src/app/support/url.paths';
import { JobPreview } from 'src/app/_typesCustom/job';


@Component({
  selector: 'app-myjobs',
templateUrl: '../../jobs/dashboard/dashboard.component.html',
styleUrls: ['../../jobs/dashboard/dashboard.component.css']
})



export class MyjobsComponent implements OnInit, OnDestroy {

  // pagination 

  p: number = 1 
  jobsPerPage: number = 4
  jobsPerPageOptions: Array<number> = [4, 6, 8, 10, 12]

  componentDestroyed$: Subject<boolean> = new Subject() 
  sub: Subscription = new Subscription
  allJobs: JobPreview[] = []

  paths = urlPaths

  constructor(private recruiterApi: RecruiterApiService ){}


  ngOnInit(): void {

    this.sub = this.recruiterApi.getAllMyJobs()
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe({
      next: (res: {}) => Object.assign(this.allJobs, res),
      error: (err) => console.log(err),
      complete: () => {}
    })

  }

  ngOnDestroy(): void {

    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
    
  }

}

