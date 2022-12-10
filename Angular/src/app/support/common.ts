import { HttpHeaders } from "@angular/common/http"
import { populateToken } from "./userMgmt"



export function generateHttpHeaders() {

    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': populateToken()
    })

    return headers

}


export function convertImageToBase64(event: any){

    let fileSelected = event.target.files[0]

    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = x => resolve(reader.result)
        reader.readAsDataURL(fileSelected)
        reader.onerror = (err) => console.log(err)
      })
    }




