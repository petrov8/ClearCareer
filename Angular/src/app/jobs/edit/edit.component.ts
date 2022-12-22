
import { JobExistingModel } from './../../_models/job';
import { Subscription } from 'rxjs';
import { FormBuilder,   Validators } from '@angular/forms';
import { JobsApiService } from './../jobs.api.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { urlPaths } from 'src/app/support/url.paths';
import { composeJobHttpBody, getJobId } from 'src/app/support/jobMgmt';
import { convertImageToBase64 } from 'src/app/support/common';




@Component({
  selector: 'app-edit',
  templateUrl: '../edit/edit.component.html',
  styleUrls: ['../new/new.component.css']
})



export class EditComponent implements OnInit {

  paths = urlPaths
  jobId: number = getJobId(this.router)

  subGet: Subscription =  new Subscription
  subPut: Subscription =  new Subscription
  
  base64: any


  constructor(
    private fb: FormBuilder, 
    private router:Router, 
    private jobApi: JobsApiService, 
    public currentJob: JobExistingModel) {
  }

  form = this.fb.group({
    title: [this.currentJob.title, [Validators.maxLength(30)]],
    image: ["", []],
    category: [this.currentJob.category, [Validators.maxLength(30)]],
    description: [this.currentJob.description, [Validators.minLength(8), Validators.maxLength(2000)]],
    requirements: [this.currentJob.requirements, [Validators.minLength(8), Validators.maxLength(2000)]],
    salary: [this.currentJob.salary, [Validators.min(700), Validators.max(1000000)]]
  })

  
  // get specific job details and load up in view 

  ngOnInit(): void {

    this.subGet = this.jobApi.getSpecificJob(this.jobId).subscribe({
      next: (res) => Object.assign(this.currentJob, res),
      error: (err) => alert(err.error.message),
      complete: () => {}
    })    
  }


  onSubmit() {

    if (this.form.invalid) { return }

    let details = composeJobHttpBody(this.form, this.base64)

    this.subPut = this.jobApi.editExistingJob(details, this.jobId)
    .subscribe({
      next: () => this.router.navigate([this.paths.dashboard]),
      error: (err) => alert(err.error.message),
      complete: () => {},
    })
  }


    // ToDo: event: {target: HTMLInput Eelement} ???? 
      async toBase64(event: any) {

        this.base64 = await convertImageToBase64(event)
    }

}


// editFileToBase64(event: any): void{

//   this.fileSelected = event.target.files[0]
//   let reader = new FileReader()
//   reader.readAsDataURL(this.fileSelected as Blob)

//   reader.onloadend = () => {

//     this.base64 = reader.result as string 
    
//   }

//   reader.onerror = function (error) {

//     console.log("base64 result: ", error)

//   }
// }