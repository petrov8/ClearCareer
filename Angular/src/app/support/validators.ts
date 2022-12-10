import { FormGroup } from '@angular/forms';


let passwordRegex = '^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$'
let fullNameRegex = "^[A-Z]{1}[a-z]+[ ]{1}[A-Z]{1}[a-z]+$"
    
function ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors?.["confirmedValidator"]) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}



export {
    ConfirmedValidator,
    passwordRegex,
    fullNameRegex
}

