import { JobsApiService } from './../jobs.api.service';
import { Subscription, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { urlPaths } from "../../support/url.paths"

import { Subject } from "rxjs"
import { JobPreview } from 'src/app/_typesCustom/job';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit, OnDestroy {

  componentDestroyed$: Subject<boolean> = new Subject() 
  sub: Subscription = new Subscription
  allJobs: JobPreview[] = []

  paths = urlPaths

  constructor(private apiService: JobsApiService){}


  ngOnInit(): void {

    this.sub = this.apiService.getAllJobs()
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
