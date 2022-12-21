import { Injectable } from '@angular/core';
import { Validators, FormGroup, FormControl} from '@angular/forms';

const form = {
    title: ["", [Validators.required, Validators.maxLength(30)]],
    image: ["", [Validators.required]],
    category: ["", [Validators.required, Validators.maxLength(30)]],
    description: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(2000)]],
    requirements: ["", [Validators.required, Validators.minLength(8), Validators.maxLength(2000)]],
    salary: ["", [Validators.required, Validators.min(700), Validators.max(1000000)]]

}

export const jobCategorySelection: Array<string> = [
    '......',
    'Architecture', 
    'Back End', 
    'Cloud', 
    'Customer Support', 
    'DevOps', 
    'Enterprise', 
    'Front End', 
    'Full Stack', 
    'HR', 
    'Management', 
    'Mobile', 
    'Networking', 
    'Security', 
    'Senior Management', 
    'Technical Support', 
    'UI-UX'
]


@Injectable({
    providedIn: "root"
})

export class NewJobForm extends FormGroup{


    constructor(){
        super(form)
    }

    get title(): FormControl {
        return this.get("title") as FormControl
    }

    get image(): FormControl {
        return this.get("title") as FormControl
    }
    
    get category(): FormControl {
        return this.get("title") as FormControl
    }

    get description(): FormControl {
        return this.get("title") as FormControl
    }

    get requirements(): FormControl {
        return this.get("title") as FormControl
    }

    get salary(): FormControl {
        return this.get("title") as FormControl
    }


}








