import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JobsApiService } from '../jobs.api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { urlPaths } from 'src/app/support/url.paths';
import { composeJobHttpBody } from 'src/app/support/jobMgmt';
import { convertImageToBase64 } from 'src/app/support/common';
import { jobCategorySelection } from 'src/app/support/forms';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})


export class NewComponent {

  errorMessage: string = ""
  jobCategories: Array<string> = jobCategorySelection

  paths = urlPaths

  subPost: Subscription = new Subscription
  base64: any



  constructor(private fb: FormBuilder, private apiService: JobsApiService, private router: Router){}

  form = this.fb.group({
    title: ["", [Validators.required, Validators.maxLength(30)]],
    image: ["", [Validators.required]],
    category: ["", [Validators.required, Validators.maxLength(30)]],
    description: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(2000)]],
    requirements: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(2000)]],
    salary: ["", [Validators.required, Validators.min(700), Validators.max(1000000)]]
  })


  onSubmit() {

    if (this.form.invalid) { return }

    let details = composeJobHttpBody(this.form, this.base64)

    this.subPost = this.apiService.postNewJob(details)
    .subscribe({
      next: () => this.router.navigate([this.paths.dashboard]),
      error: (err) => this.errorMessage=err.error.message,
      complete: () => {},
    })
  }


    // ToDo: event: {target: HTMLInput Eelement} ???? 
    async toBase64(event: any) {

      this.base64 = await convertImageToBase64(event)

  }


}


// convertImageToBase64(image: any){

//   return new Promise((resolve, reject) => {
//     let reader = new FileReader()
//     reader.onload = x => resolve(reader.result)
//     reader.readAsDataURL(image)
//   })
// }

// async convertImageToBase64(event: any){
    
//   let file = event.target.files[0]
//   let reader = new FileReader()
//   reader.readAsDataURL(file)
//   this.imageBase64 = reader.result
//   // reader.onload = function() {
//   //   return reader.result
//   // };
//   reader.onerror = function (error) {
//     console.log("base64: ", error)
//   }
//   console.log(this.imageBase64)
// }