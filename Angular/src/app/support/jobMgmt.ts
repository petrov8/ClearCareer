import { StringObj } from '../_typesCustom/common';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


export function editBase64ImageString(base64: string){

    return base64.split(",")[1]

}

export function getImageExtension(base64: string){

    return base64.split(";")[0].split("/")[1]

}


export function getJobId(router: Router) {
   

    return Number(router.url.split("/").pop());

}



export function composeJobHttpBody(form: FormGroup, base64: string){

    var body: StringObj = {
        title: form.get("title")?.value,
        category: form.get("category")?.value,
        description: form.get("description")?.value,
        requirements: form.get("requirements")?.value,
        salary: form.get("salary")?.value,
    }

    if (base64 != undefined) {
        body["picture"] = editBase64ImageString(base64)
        body["extension"] = getImageExtension(base64)
    }

    console.log(body)
    return body
}