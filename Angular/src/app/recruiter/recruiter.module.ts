import { myJobsRooting } from './recruiter.rooting';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyjobsComponent } from './myjobs/myjobs.component';



@NgModule({
  declarations: [
    MyjobsComponent
  ],
  imports: [
    CommonModule,

    myJobsRooting,
  ],
  exports: [
    MyjobsComponent
  ]
})
export class RecruiterModule { }
