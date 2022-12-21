import { FormGroup } from "@angular/forms"
import { StringObj } from "../_typesCustom/common"
import { editBase64ImageString, getImageExtension } from "./jobMgmt"


export function returnLocalStorageItem(item: string){

    if (localStorage.getItem(item)) {
        return localStorage.getItem(item)
    } else {
        return undefined
    }

}   


export function returnUserToken(){

    return returnLocalStorageItem("token")

}


export function populateToken(){

    return "Bearer " + returnUserToken()
}


export function composeUserHttpBody(form: FormGroup, base64: string){

    var body: StringObj = {
        full_name: form.get("fullName")?.value,
        email: form.get("email")?.value,
    }

    if (form.controls["password"] && form.controls["role"]){
        body["password"] = form.get("password")?.value
        body["profile_type"] = form.get("role")?.value
    }

    if (base64 != undefined) {
        body["picture"] = editBase64ImageString(base64)
        body["extension"] = getImageExtension(base64)
    }


    return body
}