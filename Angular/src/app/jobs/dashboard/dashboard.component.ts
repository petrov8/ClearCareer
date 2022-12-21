import { JobsApiService } from './../jobs.api.service';
import { Subscription, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { urlPaths } from "../../support/url.paths"

import { Subject } from "rxjs"


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit, OnDestroy {

  paths = urlPaths


  componentDestroyed$: Subject<boolean> = new Subject() 
  sub: Subscription = new Subscription
  allJobs: any[] = []

  // pagination 

  p: number = 1 
  jobsPerPage: number = 4
  jobsPerPageOptions: Array<number> = [4, 6, 8, 10, 12]


  constructor(private apiService: JobsApiService){}


  ngOnInit(): void {

    this.fetchAllJobs()

  }

  
  ngOnDestroy(): void {

    this.componentDestroyed$.next(true)
    this.componentDestroyed$.complete()
    
  }


  fetchAllJobs(): void {

    this.sub = this.apiService.getAllJobs()
    .pipe(takeUntil(this.componentDestroyed$))
    .subscribe((res: {}) => Object.assign(this.allJobs, res))

  }




}
