import { myJobsRooting } from './recruiter.rooting';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyjobsComponent } from './myjobs/myjobs.component';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    MyjobsComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,

    myJobsRooting,
  ],
  exports: [
    MyjobsComponent
  ]
})
export class RecruiterModule { }
