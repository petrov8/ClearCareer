
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})



export class GlobalErrorService {

    assignErrors(err: HttpErrorResponse): string {
        let errorMessage = "Ooops ... something broke :("
        // check if client side error 
        console.log(err)

        if (err.error instanceof ErrorEvent) {
            errorMessage = err.error.message
        }
        // all other types will be server side errors
        else {
            
            // check if server is live 
            if (err.status == 0 && err.statusText === "Unknown Error") {
                errorMessage = "Connection problem"
            } 
            else if (err.status !== 0){
                errorMessage = err.error.message
            }
        }
        return errorMessage
    }

}

